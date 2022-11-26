import React, {useState, useEffect, useRef} from 'react'

import 'react-autocomplete-input/dist/bundle.css';
import TaskDetail from '../TaskDetail/TaskDetail';
import TaskEdit from '../TaskEdit/TaskEdit';

import request from '../../util/request';

const TaskDetailModal = ({taskId, refresh, users, path, title, desc, subtasks, endDate, treeData, setTreeData, removeNode, setTasksToDelete, setTasksToUpdate}) => {

    const [editMode, setEditMode] = useState(false);
    const [members, setMembers] = useState([]);
    const [images, setImages] = useState({});
    const [imageUrls, setImageUrls] = useState([]);
    const [refreshGallery, setRefreshGallery] = useState(false);
    const taskDetailModal = useRef();


    // const newPath = [...path];
    // newPath.splice(-1, 1);
    // // newPath is the path of the parent, starting from the current node.

    // const parentNode = getNodeAtPath({
    //     treeData,
    //     path: newPath,
    //     getNodeKey,
    // }).node;

    // console.log(parentNode)

   useEffect(() => {
      console.log(editMode);
   }, [editMode]);  

   useEffect(() => {
       const fetchImageUrls = async () => {
          const res = await request.get(`/task/${taskId}/images`);
          if(res.data) {
            setImageUrls([...res.data.images.map(imgUrl => ({
              original:  imgUrl,
              thumbnail: `https://res.cloudinary.com/duvvax1vs/image/upload/c_thumb,w_200,g_face/${imgUrl.substring(49)}`
            }))])
          }
       } 
       if(taskId) {
         fetchImageUrls();
       }
   }, [refreshGallery, taskId])

   useEffect(() => {
    console.log(imageUrls);
   }, [imageUrls])

   useEffect(() => {
    console.log("images", images);
   }, [images])

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
   }, [taskId, refresh])
   
   useEffect(() => {
      let ref = null;  
      if(taskDetailModal && taskDetailModal.current) {
        ref = taskDetailModal.current;
        const toggleEditMode = () => setEditMode(false);
        ref.addEventListener('hidden.bs.modal',  toggleEditMode);  

        return() => {
            ref.removeEventListener('hidden.bs.modal', toggleEditMode);
        }
      }
   }, [taskDetailModal])

  return (
    <div className="modal fade" tabIndex="-1" ref={taskDetailModal} id="taskDetailModal">
            <div className="modal-dialog">
                <div className="modal-content">
                    {editMode ? 
                    <TaskEdit taskId={taskId} images={images} setImages={setImages} users={users} members={members} 
                    prevSubtasks={subtasks} title={title} endDate={endDate} desc={desc} setTasksToDelete={setTasksToDelete} 
                    treeData={treeData} path={path} setTreeData={setTreeData} removeNode={removeNode} setTasksToUpdate={setTasksToUpdate} 
                    refreshGallery={setRefreshGallery}
                    setEditMode={setEditMode}
                    />
                    :                      
                    <TaskDetail taskId={taskId} title={title} images={imageUrls} subtasks={subtasks} members={members} 
                    desc={desc} endDate={endDate} setImages={setImageUrls} refreshGallery={setRefreshGallery} setEditMode={setEditMode}/>}       
                </div>
            </div>        
    </div>
  )
}

export default TaskDetailModal