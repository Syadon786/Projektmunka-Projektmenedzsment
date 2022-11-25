import React, {useEffect, useState} from 'react'
import Page from '../../components/Page/Page'

import  SortableTree, {removeNodeAtPath} from 'react-sortable-tree';
import 'react-sortable-tree/style.css';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import Button from '../../components/Button/Button';

import hash from 'object-hash'

import './ProjectTree.css';
import '../../styles/ProjectTree.css';
import { useProject} from '../../contexts/ProjectContext';
import TaskModal from '../../components/TaskModal/TaskModal';
import request from '../../util/request';
import TaskDetailModal from '../../components/TaskDetailModal/TaskDetailModal';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const ProjectTree = () => {
  const {actProject, projectTreeData, setProjectTreeData} = useProject();
  const [treeData, setTreeData] = useState([{}]);
  const [oldTreeData, setOldTreeData] = useState([{}]);

  const [oldStateHash, setOldStateHash] = useState("");
  const [newStateHash, setNewStateHash] = useState("");

  const [newTasks, setNewTasks] = useState([]);
  const [tasksToDelete, setTasksToDelete] = useState([]);
  const [tasksToUpdate, setTasksToUpdate] = useState([]);
  const [actRowInfo, setActRowInfo] = useState({node: {taskId: "", title: "", description: ""}});
  const [users, setUsers] = useState([]);
  
  const [refreshModal, setRefreshModal] = useState(false);

  useEffect(() => {
    const fetchProjectUsers = async () => {
        const res = await request.get(`/project/${actProject.value}/users`)
        if(res.data) {
          setUsers(res.data.map((act) => act.email.split('@')[0]));
        }
    };
    fetchProjectUsers();
  }, [actProject.value]);  

  const handleUpdate = async () => {
      const toDelete = [];
      if(tasksToDelete.length > 0) {
        const getTaskIds = (tasks) => {
          tasks.forEach((task, index) => {
            if(task._id === newTasks[index]?._id) {
                let data = [...newTasks];
                data.splice(index, 1);
                setNewTasks(data);
            }
            else if(task._id === tasksToUpdate[index]?._id) {
                let data = [...tasksToUpdate];
                data.splice(index, 1);
                setTasksToUpdate(data);
            }
            toDelete.push(request.delete(`/task/${task.taskId}`));
            if(!task.hasOwnProperty("children")) return;
            getTaskIds(task.children);
          })
        };
        getTaskIds(tasksToDelete); 
      }

      axios.all([
        request.patch(`/project/${actProject.value}`, {
          treeData: treeData
        }),
        ...newTasks.map(task => {
          return request.post("/task", {
            _id: task._id,
            title: task.title,
            projectId: actProject.value,
            startDate: task.startDate,
            endDate: task.endDate,
            description: task.description,
            members: task.members
          });
        }),
        ...toDelete,
        ...tasksToUpdate.map(task => {
          return request.patch(`/task/${task.taskId}`, {
            title: task.title,
            projectId: actProject.value,
            endDate: task.endDate,
            description: task.description,
            members: task.members,
            subtasks: task.subtasks.filter(subtask => subtask !== "")
          })
        }),
      ]).then(axios.spread((...response) => {
        console.log(response);
        toast.success(`Project tree was successfully updated.`);
        setProjectTreeData(treeData);
        setNewTasks([]);
        setTasksToDelete([]);
        setTasksToUpdate([]);
        setRefreshModal(prev => !prev);
      }));
  }

  useEffect(() => {
    setNewStateHash(hash(treeData[0]));
  }, [treeData]);

  useEffect(() => {
     setOldStateHash(hash(oldTreeData[0]));
  }, [oldTreeData])

  useEffect(() => {
      setTreeData(projectTreeData);
      setOldTreeData(projectTreeData);
  }, [actProject, projectTreeData])

  useEffect(() => {
    if(newStateHash === oldStateHash) {
      setNewTasks([]);
      setTasksToDelete([]);
      setTasksToUpdate([]);
    }
   
  }, [newStateHash, oldStateHash])

  return (
    <Page title={actProject.label} noCard>
          {(oldStateHash !== newStateHash) ? 
          <>
          <Button onClick={handleUpdate}>Save changes</Button>
          <Button className="ms-2" color="secondary" onClick={() => {
            setTreeData(oldTreeData);
            setTasksToDelete([]);
            setNewTasks([]);
            setTasksToUpdate([]);
            }}>Cancel changes</Button>
          </>
           : null}
        <SortableTree
          treeData={treeData}
          onChange={((prevData) => {setTreeData(prevData)})}
          isVirtualized={false}
          canDrag={({treeIndex}) => {if(treeIndex !== 0) 
                                          return true;
                                     return false;     
                                    }}
          canDrop={({nextPath}) => {if(nextPath.length === 1) 
                                    return false;
                                    return true;
          
          }}                
          generateNodeProps={(rowInfo) => ({
            buttons: [
              <button className="bar-btn" data-bs-toggle="modal" data-bs-target="#taskDetailModal" onClick={() => {                             
                        setActRowInfo(rowInfo)
                        console.log(rowInfo.node);
              }}>
                <CircularProgressbar className='bar' value={0.66} maxValue={1} text="66%"/>
              </button>,
              <button className="add-btn" data-bs-toggle="modal" data-bs-target="#taskModal"
                  onClick={() => {       
                    setActRowInfo(rowInfo)
                  }}
                >
                 <i className="bi bi-plus-circle"></i>
                </button>
            ]
          })}
        />

        <TaskModal title="Create a New Task"  users={users} treeData={treeData} rowInfo={actRowInfo} setTreeData={setTreeData} setNewTask={setNewTasks}/>
    
        <TaskDetailModal path={actRowInfo.path} title={actRowInfo.node.title} subtasks={actRowInfo.node.subtasks} users={users} desc={actRowInfo.node.description} taskId={actRowInfo.node.taskId} 
        endDate={actRowInfo.node.endDate} refresh={refreshModal} 
        setTreeData={setTreeData} treeData={treeData} removeNode={removeNodeAtPath} setTasksToDelete={setTasksToDelete} setTasksToUpdate={setTasksToUpdate}></TaskDetailModal>
        <ToastContainer/>
    </Page>
  )

 
}

export default ProjectTree