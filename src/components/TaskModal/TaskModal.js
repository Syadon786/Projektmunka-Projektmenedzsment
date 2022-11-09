import React, {useState} from 'react'
import  {addNodeUnderParent} from 'react-sortable-tree';
import FormModal from '../FormModal/FormModal';

import { v4 as uuidv4 } from 'uuid'

const TaskModal = ({title, treeData, rowInfo, setTreeData}) => {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");

  const getNodeKey = ({ treeIndex }) => treeIndex;

  const addChildNode = () => {
    return addNodeUnderParent({
      treeData: treeData,
      newNode: {taskId: uuidv4(), title: taskName, description: description},
      parentKey: rowInfo.path[rowInfo.path.length - 1],
      expandParent: true,
      getNodeKey,                     
    }).treeData
  }

  return (
    <FormModal id="taskModal" title={title} approveText="Save" 
    approveFunc={() => {  
                    setTreeData(addChildNode());
                    setTaskName("");
                    setDescription("");
      }}>
      <div className="form-group">
          <label >Task name</label>
          <input type="text" 
              value={taskName}
              onChange={(event) => setTaskName(event.target.value)} 
              className="form-control" required/>
      </div>
      <div className="form-group mt-2">
          <label>Task description</label>
          <textarea className="form-control" onChange={(event) => {setDescription(event.target.value)}} value={description}></textarea>
      </div>
    </FormModal>
  )
}

export default TaskModal