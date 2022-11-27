import React, { useState, useRef, useEffect } from 'react'
import { toast } from 'react-toastify';
import request from '../../util/request'
import Modal from '../Modal/Modal'
import TaskUsers from '../TaskUsers/TaskUsers'

const TaskUserModal = ({projectId, taskId, taskTitle, refreshTaskMembers, permissions, setPermissions, refreshPermissions}) => {
    const [members, setMembers] = useState([]);
    const [permissionsToUpdate, setPermissionsToUpdate] = useState({})
    const taskUserModal = useRef();

    const handleUpdatePermissions = async () => {
       await request.post(`/permissions/${projectId}`, {
        permToUpdate: permissionsToUpdate,
        taskId: taskId
       })
       setPermissionsToUpdate({});
       refreshPermissions(prev => !prev);
       toast.success("User Permissions were successfully updated.")
    }

    useEffect(() => {
      let ref = null;  
      if(taskUserModal && taskUserModal.current) {
        ref = taskUserModal.current;
        const clearPermissionsToUpdate = () => setPermissionsToUpdate({});
        ref.addEventListener('hidden.bs.modal',  clearPermissionsToUpdate);  

        return() => {
            ref.removeEventListener('hidden.bs.modal', clearPermissionsToUpdate);
        }
      }
   }, [taskUserModal])

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
    }, [taskId, refreshTaskMembers])

  return (

    <>
    <Modal className="modal-xl" id="taskUserModal" ref={taskUserModal} title={`User Permission Table - ${taskTitle}`} approveText="Update Permissions" 
    approveFunc={() => {
      if(Object.keys(permissionsToUpdate).length > 0)
        handleUpdatePermissions()
    }}>
        <TaskUsers taskId={taskId} members={members} permissions={permissions} setPermissions={setPermissions}
        permissionsToUpdate={permissionsToUpdate} setPermissionsToUpdate={setPermissionsToUpdate}/>
    </Modal>
    </>
  )
}

export default TaskUserModal