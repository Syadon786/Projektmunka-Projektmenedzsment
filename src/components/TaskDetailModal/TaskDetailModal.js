import React, {useEffect, useState} from 'react'
import Button from '../Button/Button';
import request from '../../util/request';
//import { useAuth } from '../../contexts/AuthContext';

import TextInput from 'react-autocomplete-input';
import 'react-autocomplete-input/dist/bundle.css';

const TaskDetailModal = ({taskId, path, title, desc, projectId, treeData, setTreeData, removeNode}) => {
    const [selectedUsers, setSelectedUsers] = useState("");
    const [users, setUsers] = useState([]);
    const getNodeKey = ({ treeIndex }) => treeIndex;

    //const {user} = useAuth();
    useEffect(() => {
        const fetchProjectUsers = async () => {
            const res = await request.get(`/project/${projectId}/users`)
            if(res.data) {
              setUsers(res.data.map((act) => act.email.split('@')[0]));
              console.log(res.data)
            }
        };
        fetchProjectUsers();
      }, [projectId]);  

      // emails: emails: selectedUsers.slice(1).trim().split("@").map((act) => act.trim()+"@gmail.com")

  return (
    <div className="modal fade" tabIndex="-1" id="taskDetailModal">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">{title}</h5>
                    <Button color="light" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></Button>
                </div>
                <div className="modal-body">  
                <h6>Description:</h6>
                <div className="mb-4">{desc}</div>    
                <label>Add members to the Task (type @)</label>
                <TextInput className="form-control"  options={users} 
                onChange={(event) => {
                    console.log(event);
                    setSelectedUsers(event);
                }}
                value={selectedUsers}/>
                </div>              
                <div className="modal-footer">
                    <Button color="danger" style={{position: "absolute", left: "15px"}} data-bs-dismiss="modal" onClick={() => {
                       setTreeData(removeNode({treeData: treeData, path: path, getNodeKey: getNodeKey, ignoreCollapsed: false}));
                    }                     
                    }>Delete</Button>
                    <Button color="secondary" data-bs-dismiss="modal">Close</Button>
                    <Button data-bs-dismiss="modal" onClick={() => {}}>Save (in progress)</Button>
                </div>
                </div>
            </div>        
    </div>
  )
}

export default TaskDetailModal