import React, {useState} from 'react'
import  {addNodeUnderParent} from 'react-sortable-tree';
import FormModal from '../FormModal/FormModal';

const TaskModal = ({title, treeData, rowInfo, setTreeData}) => {
  const [taskName, setTaskName] = useState("");
  const getNodeKey = ({ treeIndex }) => treeIndex;

  const addChildNode = () => {
    return addNodeUnderParent({
      treeData: treeData,
      newNode: {  title: taskName},
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
      }}>
      <div className="form-group">
          <label >Task name</label>
          <input type="text" 
              value={taskName}
              onChange={(event) => setTaskName(event.target.value)} 
              className="form-control" required/>
      </div>
      <div className="form-group mt-2">
          <label>Task description (in progress)</label>
          <textarea className="form-control"></textarea>
      </div>
      <div className="form-group mt-2">
          <label>Add members to the task(in progress)</label>
          <textarea className="form-control"></textarea>
      </div>
    </FormModal>
  )
}

export default TaskModal