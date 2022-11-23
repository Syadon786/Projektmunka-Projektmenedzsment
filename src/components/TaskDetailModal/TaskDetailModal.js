import React, {useState, useEffect, useRef} from 'react'

import 'react-autocomplete-input/dist/bundle.css';
import TaskDetail from '../TaskDetail/TaskDetail';
import TaskEdit from '../TaskEdit/TaskEdit';

import request from '../../util/request';

const TaskDetailModal = ({taskId, refresh, users, path, title, desc, subtasks, endDate, treeData, setTreeData, removeNode, setTasksToDelete, setTasksToUpdate}) => {

    const [editMode, setEditMode] = useState(false);
    const [members, setMembers] = useState([]);
    const taskDetailModal = useRef();

   useEffect(() => {
      console.log(editMode);
   }, [editMode]);  

   useEffect(() => {
       if(taskId) {
        const fetchTaskMembers = async () => {
          const res = await request.get(`/task/${taskId}/members/`);
          if(res.data === 'Failure') {
              setMembers([]);
          }
          else {
            setMembers(res.data);
          }
        }
        fetchTaskMembers();
       }
   }, [taskId, refresh])
   
   useEffect(() => {
      let ref = null;  
      if(taskDetailModal && taskDetailModal.current) {
        ref = taskDetailModal.current;
        const toggleEditMode = () => setEditMode(false);
        ref.addEventListener('hidden.bs.modal',  toggleEditMode);  

        return() => {
            ref.removeEventListener('hidden.bs.modal', toggleEditMode);
        }
      }
   }, [taskDetailModal])

  return (
    <div className="modal fade" tabIndex="-1" ref={taskDetailModal} id="taskDetailModal">
            <div className="modal-dialog">
                <div className="modal-content">
                    {editMode ? 
                    <TaskEdit taskId={taskId} users={users} members={members} prevSubtasks={subtasks} title={title} endDate={endDate} desc={desc} setTasksToDelete={setTasksToDelete} 
                    treeData={treeData} path={path} setTreeData={setTreeData} removeNode={removeNode} setTasksToUpdate={setTasksToUpdate}/>
                    :                      
                    <TaskDetail title={title} subtasks={subtasks} members={members} desc={desc} endDate={endDate} setEditMode={setEditMode}/>}       
                </div>
            </div>        
    </div>
  )
}

export default TaskDetailModal