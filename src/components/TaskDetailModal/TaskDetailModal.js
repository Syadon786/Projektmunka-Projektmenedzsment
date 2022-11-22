import React from 'react'
import Button from '../Button/Button';
//import request from '../../util/request';
//import { useAuth } from '../../contexts/AuthContext';

import 'react-autocomplete-input/dist/bundle.css';
import { getNodeAtPath } from '../../util/tree-data-utils';

const TaskDetailModal = ({taskId, path, title, desc, endDate, treeData, setTreeData, removeNode, setTasksToDelete}) => {
    const getNodeKey = ({ treeIndex }) => treeIndex;

    //const {user} = useAuth();
      // emails: emails: selectedUsers.slice(1).trim().split("@").map((act) => act.trim()+"@gmail.com")

  return (
    <div className="modal fade" tabIndex="-1" id="taskDetailModal">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">{title}</h5>
                    <p className="modal-title" style={{position: "absolute", right: "70px"}}>{endDate}</p>
                    <Button color="light" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></Button>
                </div>
                <div className="modal-body">  
                <h6>Description:</h6>
                <div className="mb-4">{desc}</div>    
                </div>              
                <div className="modal-footer">
                    <Button color="danger" style={{position: "absolute", left: "15px"}} data-bs-dismiss="modal" onClick={() => {
                       setTasksToDelete((prev) => [...prev, getNodeAtPath({treeData: treeData, path: path, getNodeKey: getNodeKey, ignoreCollapsed: false}).node]) 
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