import React, {useState} from 'react'
import  {addNodeUnderParent} from 'react-sortable-tree';
import FormModal from '../FormModal/FormModal';
import TextInput from 'react-autocomplete-input';


import DatePicker from "react-datepicker";
import { v4 as uuidv4 } from 'uuid'

import "react-datepicker/dist/react-datepicker.css";

const TaskModal = ({title, treeData, users, rowInfo, setTreeData, setNewTask}) => {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [endDate, setEndDate] = useState(new Date(new Date().getTime() + 24 * 60 * 60 * 1000));
  const [selectedUsers, setSelectedUsers] = useState("");
  
  const getNodeKey = ({ treeIndex }) => treeIndex;

  const addChildNode = () => {
    const taskId = uuidv4();
    setNewTask((prev) => [...prev, {_id: taskId, title: taskName, description: description, 
      startDate: new Date().toLocaleDateString("hu-HU"),
      endDate: endDate.toLocaleDateString("hu-HU"),
      members: [...(selectedUsers.slice(1).trim().split("@").map((act) => act.trim()+"@gmail.com"))]}]
      );
    return addNodeUnderParent({
      treeData: treeData,
      newNode: {taskId: taskId, title: taskName, description: description, 
        endDate: endDate.toLocaleDateString('en-EN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
        members: [...(selectedUsers.slice(1).trim().split("@").map((act) => act.trim()+"@gmail.com"))], 
        subtasks: [],
        children: []
      },
      parentKey: rowInfo.path[rowInfo.path.length - 1],
      expandParent: true,
      getNodeKey,                     
    }).treeData
  }

  return (
    <FormModal id="taskModal" title={title} approveText="Save" 
    approveFunc={() => {  
              if(taskName) {
                setTreeData(addChildNode());
              }
              setTaskName("");
              setDescription("");
              setSelectedUsers("");
      }}>
      <div className="form-group">
          <label >Task name</label>
          <input type="text" 
              value={taskName}
              onChange={(event) => setTaskName(event.target.value)} 
              className="form-control" required/>
      </div>
      <div className="form-group mt-2">
          <label>End date</label>
          <DatePicker minDate={endDate} selected={endDate} onChange={(date) => {
                setEndDate(date);
          }} />
      </div>
      <div className="form-group mt-2">
          <label>Task description</label>
          <textarea className="form-control" onChange={(event) => {setDescription(event.target.value)}} value={description}></textarea>
      </div>
      <label>Add members to the Task (type @)</label>
      <TextInput className="form-control"  options={users} 
      onChange={(event) => {
          console.log(event);
          setSelectedUsers(event);
      }}
      value={selectedUsers}/>
    </FormModal>
  )
}

export default TaskModal