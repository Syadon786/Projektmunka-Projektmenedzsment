import React from 'react'

import "./TaskUser.css";

const TaskUser = ({id, photo, name, email, taskId, permissions, permissionsToUpdate, setPermissionsToUpdate}) => {
    const handleChange = (perm) => {
         let data = {...permissionsToUpdate}

        // if(permissions) {
        //     data = {...permissions}
        // }
        //  if(!(`${taskId}` in data)) {
        //     data[`${taskId}`] = {}
        //  }
        // if(!(`${id}` in data[`${taskId}`])) {
        //      data[`${taskId}`][`${id}`] = {}
        // }
        // if(!(`${perm}` in data[`${taskId}`][`${id}`])) {
        //     data[`${taskId}`][`${id}`][`${perm}`] = true;
        // }
        // else {
        //     data[`${taskId}`][`${id}`][`${perm}`] = !data[`${taskId}`][`${id}`][`${perm}`];
        // }

        if(!(`${id}` in data)) {
            if(!(`${id}` in permissions[`${taskId}`])) {
                data[`${id}`] = {
                    "read": false,
                    "edit": false,
                    "delete": false,
                    "approve": false,
                    "setPermissions": false
                }
                data[`${id}`][`${perm}`] = true;
            }
            else {
                data[`${id}`] = {
                    "read": permissions[`${taskId}`][`${id}`]["read"],
                    "edit": permissions[`${taskId}`][`${id}`]["edit"],
                    "delete": permissions[`${taskId}`][`${id}`]["delete"],
                    "approve": permissions[`${taskId}`][`${id}`]["approve"],
                    "setPermissions": permissions[`${taskId}`][`${id}`]["setPermissions"]
                }
                data[`${id}`][`${perm}`] = !permissions[`${taskId}`][`${id}`][`${perm}`];
            }     
        }      
        else {
            data[`${id}`][`${perm}`] = !data[`${id}`]?.[`${perm}`] ? true : !data[`${id}`]?.[`${perm}`];
        }
      
        setPermissionsToUpdate(data);
    }
    return (
      <tr>
            <td><img className="homepage-user-img" src={photo} alt={`${name}`} referrerPolicy="no-referrer"/></td>
            <td>{email}</td>
            <td>{name}</td>
            <td>
                <input className="form-check-input" type="checkbox" 
                checked={(`${id}` in permissionsToUpdate) ? 
                permissionsToUpdate[`${id}`][`read`] : permissions?.[`${taskId}`]?.[`${id}`]?.["read"] ? 
                permissions?.[`${taskId}`]?.[`${id}`]?.["read"] : false}
                onChange={() => {handleChange("read")}}
                />
            </td>
            <td>
                <input className="form-check-input" type="checkbox"
                checked={(`${id}` in permissionsToUpdate) ? 
                permissionsToUpdate[`${id}`]["edit"] : permissions?.[`${taskId}`]?.[`${id}`]?.["edit"] ? 
                permissions?.[`${taskId}`]?.[`${id}`]?.["edit"] : false}
                onChange={() => {handleChange("edit")}}
                />
            </td>
            <td>      
                <input className="form-check-input" type="checkbox"
                checked={(`${id}` in permissionsToUpdate) ? 
                permissionsToUpdate[`${id}`]["delete"] : permissions?.[`${taskId}`]?.[`${id}`]?.["delete"] ? 
                permissions?.[`${taskId}`]?.[`${id}`]?.["delete"] : false}
                onChange={() => {handleChange("delete")}}
                />    
            </td>
            <td>
                <input className="form-check-input" type="checkbox"
                checked={(`${id}` in permissionsToUpdate) ? 
                permissionsToUpdate[`${id}`]["approve"] : permissions?.[`${taskId}`]?.[`${id}`]?.["approve"] ? 
                permissions?.[`${taskId}`]?.[`${id}`]?.["approve"] : false}
                onChange={() => {handleChange("approve")}}
                />
            </td>
            <td>
                <input className="form-check-input" type="checkbox"
                checked={(`${id}` in permissionsToUpdate)  ? 
                permissionsToUpdate[`${id}`][`setPermissions`] : permissions?.[`${taskId}`]?.[`${id}`]?.["setPermissions"] ? 
                permissions?.[`${taskId}`]?.[`${id}`]?.["setPermissions"] : false}
                onChange={() => {handleChange("setPermissions")}}
                />
            </td> 
      </tr>
    )
  }

export default TaskUser