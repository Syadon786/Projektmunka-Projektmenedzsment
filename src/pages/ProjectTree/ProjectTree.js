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

const ProjectTree = () => {
  const {actProject, projectTreeData, setProjectTreeData} = useProject();
  const [treeData, setTreeData] = useState([{}]);
  const [oldTreeData, setOldTreeData] = useState([{}]);

  const [oldStateHash, setOldStateHash] = useState("");
  const [newStateHash, setNewStateHash] = useState("");

  const [newTasks, setNewTasks] = useState([]);
  const [tasksToDelete, setTasksToDelete] = useState([]);
  const [actRowInfo, setActRowInfo] = useState({node: {taskId: "", title: "", description: ""}});

  const handleUpdate = async () => {
      const toDelete = [];
      if(tasksToDelete.length > 0) {
        const getTaskIds = (tasks) => {
          tasks.forEach(task => {
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
        ...toDelete
      ]).then(axios.spread((projectRes, tasksRes) => {

        //setOldTreeData(treeData);
        setProjectTreeData(treeData);
        setNewTasks([]);
        setTasksToDelete([]);
      }));
  }
  useEffect(() => {
    console.log("New Task", newTasks);
  }, [newTasks]);

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

  return (
    <Page title={actProject.label} noCard>
          {(oldStateHash !== newStateHash) ? 
          <>
          {/* <Button onClick={() => {setTreeData(toggleExpandedForAll({treeData: treeData, expanded: false}))}}>Collapse all</Button> */}
          <Button onClick={handleUpdate}>Save changes</Button>
          <Button className="ms-2" color="secondary" onClick={() => {
            setTreeData(oldTreeData);
            setTasksToDelete([]);
            setNewTasks([]);
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

        <TaskModal title="Create a New Task"  projectId={actProject.value} treeData={treeData} rowInfo={actRowInfo} setTreeData={setTreeData} setNewTask={setNewTasks}/>
    
        <TaskDetailModal path={actRowInfo.path} title={actRowInfo.node.title} desc={actRowInfo.node.description} taskId={actRowInfo.node.taskId} 
        endDate={actRowInfo.node.endDate}
        setTreeData={setTreeData} treeData={treeData} removeNode={removeNodeAtPath} setTasksToDelete={setTasksToDelete}></TaskDetailModal>
    </Page>
  )

 
}

export default ProjectTree