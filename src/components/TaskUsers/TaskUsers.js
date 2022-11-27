import React from 'react'
import TaskUser from '../TaskUser/TaskUser'

const TaskUsers = ({members, taskId, permissions, permissionsToUpdate, setPermissionsToUpdate}) => {
    return (
        <div className="table-responsive">
        <table className="table">
            <thead>
                <tr>
                    <th></th>
                    <th>Email</th>
                    <th>Name</th>
                    <th>Read</th>
                    <th>Edit</th>
                    <th>Delete</th>
                    <th>Approve</th>
                    <th>Set Permissions</th>
                </tr>
            </thead>
            <tbody>
                {members.map(user => {
                    return <TaskUser taskId={taskId} permissions={permissions} 
                    setPermissionsToUpdate={setPermissionsToUpdate}
                    permissionsToUpdate={permissionsToUpdate}
                    key={user._id} id={user._id} 
                    name={user.name} email={user.email} photo={user.photo}/>
                })} 
            </tbody>
        </table>
      </div>
      )
}

export default TaskUsers