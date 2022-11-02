import React, {useState} from 'react'
import Button from '../Button/Button'
import  {addNodeUnderParent} from 'react-sortable-tree';

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
    <>
    <div className="modal fade" tabIndex="-1" id="taskModal">
    <div className="modal-dialog">
        <div className="modal-content">
        <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <Button color="light" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></Button>
        </div>
        <form className="col-md-12 go-right">
            <div className="modal-body">
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

            </div>
            <div className="modal-footer">
                <Button onClick={(event) => event.preventDefault()} color="secondary" data-bs-dismiss="modal">Close</Button>
                <Button data-bs-dismiss="modal" onClick={(event) => {
                    event.preventDefault()
                    setTreeData(addChildNode());
                    setTaskName("");
                }}>Save</Button>
            </div>
        </form>
        </div>
    </div>
    </div>
    </>
  )
}

export default TaskModal