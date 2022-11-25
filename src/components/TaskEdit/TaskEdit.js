import React, {useState, useEffect} from 'react'
import Button from '../Button/Button'

import { getNodeAtPath, changeNodeAtPath } from 'react-sortable-tree';
import TextInput from 'react-autocomplete-input';
import DatePicker from "react-datepicker";
import AvatarGroup from '@atlaskit/avatar-group';
import ImageUploader from "react-images-upload";
import request from '../../util/request';

import DynamicInput from '../DynamicInput/DynamicInput';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import "./TaskEdit.css";

const TaskEdit = ({taskId, members, images, setImages, users, prevSubtasks, title, desc, endDate, setTasksToDelete, 
    treeData, path, setTreeData, removeNode, setTasksToUpdate, refreshGallery}) => {
    const getNodeKey = ({ treeIndex }) => treeIndex;
    const [taskName, setTaskName] = useState(title);
    const [description, setDescription] = useState(desc);
    const [newEndDate, setNewEndDate] = useState(new Date(endDate));
    const [subtasks, setSubtasks] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState("");
  
    useEffect(() => {
        if(prevSubtasks) {
            setSubtasks([...prevSubtasks]);
        }
    }, [prevSubtasks])

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    const handleUpload = async () => {
        axios.all([ 
             ...images[`${taskId}`].map(image => {return request.post(`/task/image/upload`, {
                image: image,
                taskId: taskId
             })})
          ]).then(axios.spread((...response) => {
            console.log("res", response);
            toast.success(`${response.length} image(s) was successfully uploaded.`);
            refreshGallery((prev) => !prev);
            const data = {...images};
            data[`${taskId}`] = [];
            setImages(data);
          }));

    }

    const onDrop = async picture => {
        console.log(picture);
        const data = {...images};
        if( data[`${taskId}`]) {
            if( data[`${taskId}`].length < 10) {
                data[`${taskId}`] = [...data[`${taskId}`], await toBase64(picture[picture.length - 1])];
            }
        }
        else {
            data[`${taskId}`] = [await toBase64(picture[picture.length - 1])];
        }
        setImages(data);
      };

    const setChanges = () => {
      const updatedTask = {taskId: taskId, title: taskName, description: description, 
        endDate: newEndDate.toLocaleDateString('en-EN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
        members: [...members.map(member => member.email), ...(selectedUsers.slice(1).trim().split("@").map((act) => act.trim()+"@gmail.com"))], 
        subtasks: [...subtasks],
        };

      setTasksToUpdate((prev) => [...prev, updatedTask]);
      setTreeData(changeNodeAtPath({treeData: treeData,
            path: path,
            newNode: updatedTask,
            getNodeKey  }));
    };

    return (
        <>
        <div className="modal-header">
            <h5 className="modal-title me-auto">Edit: {title}</h5>
            <div className="modal-title ms-auto">
            {members ? 
             <AvatarGroup appearance="stack" maxCount={2} data={
              [
                  ...members.map(user => ({
                  email: user.email,
                  key: user._id,
                  name: user.name,
                  src: user.photo 
                  }))
              ]            
              }
                /> 
            : <></>}
            </div>
            <Button color="light" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></Button>
        </div>
        <div className="modal-body">  
            <div className="col-md-12 go-right">
                <div className="form-group">
                    <label >Task Name</label>
                    <input type="text" 
                        value={taskName} 
                        onChange={(event) => setTaskName(event.target.value)} 
                        className="form-control mt-2" required/>
                </div>
                <div className="form-group mt-2">
                <label>End date</label>
                    <DatePicker className="mt-2" minDate={new Date(new Date(new Date().getTime() + 24 * 60 * 60 * 1000))} selected={newEndDate} onChange={(date) => {
                            setNewEndDate(date);
                    }} />
                </div>
                <div className="form-group mt-2">
                    <label>Task description</label>
                    <textarea className="form-control mt-2" onChange={(event) => {setDescription(event.target.value)}} value={description}></textarea>
                </div>
                <div className="form-group mt-2">
                <label>Subtasks:</label>
                    <div className="">
                        <DynamicInput fieldData={subtasks} setFieldData={setSubtasks}/>
                    </div>
                </div>
                <div className="form-group mt-2">
                    <label>Add new members to the Task (type @)</label>
                      <TextInput className="form-control" options={users.filter(user => !members.map((act) => act.email.split('@')[0]).includes(user))}
                    onChange={(event) => {
                        setSelectedUsers(event);
                    }}
                value={selectedUsers}/>  
                </div>
                <div className="form-group mt-2">
                <ImageUploader               
                    withIcon={true}
                    onChange={onDrop}
                    imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                    maxFileSize={5242880}
                 />
                 {images[`${taskId}`]?.length > 0 ?   
                    <div>
                        <span>
                            Added {images[`${taskId}`].length} image.
                        </span>
                        <Button className="btn-sm ms-2"  onClick={() => {
                           handleUpload()
                        }}>Upload</Button>   
                        <Button color="secondary" className="btn-sm ms-2"  onClick={() => {
                            const data = {...images};
                            data[`${taskId}`] = [];
                            setImages(data);
                            }}>Clear</Button>                      
                    </div>
                : <></>} 
                </div>
            </div>
        </div>              
        <div className="modal-footer">
            <Button color="danger" style={{position: "absolute", left: "15px"}} data-bs-dismiss="modal" onClick={() => {
                setTasksToDelete((prev) => [...prev, getNodeAtPath({treeData: treeData, path: path, getNodeKey: getNodeKey, ignoreCollapsed: false}).node]) 
                setTreeData(removeNode({treeData: treeData, path: path, getNodeKey: getNodeKey, ignoreCollapsed: false}));
            }                     
            }>Delete</Button> 
            <Button color="secondary" data-bs-dismiss="modal">Close</Button>
            <Button data-bs-dismiss="modal" onClick={setChanges}>Set Changes</Button> 
        </div>
        <ToastContainer />
        </>
      )
}

// changeNodeAtPath({
//     treeData,
//     path,
//     newNode,
//     getNodeKey,
//     ignoreCollapsed = true,
//   })

export default TaskEdit