import React, {useRef} from 'react'
import Button from '../Button/Button';
import AvatarGroup from '@atlaskit/avatar-group';
import ImageGallery from 'react-image-gallery';
import { ToastContainer, toast } from 'react-toastify';

import request from '../../util/request';

import "./TaskDetail.css";
import 'react-toastify/dist/ReactToastify.css';

const TaskDetail = ({taskId, members, images, subtasks, title, desc, endDate, setEditMode, setImages, refreshGallery}) => {
  const imageGallery = useRef(); 

  const handleImageDelete = async (url) => {
    const assetName = url.substring(61).split('.')[0];
    const res = await request.delete(`/task/${taskId}/image`, {
      data: {
        assetName: assetName,
        url: url
      }
    });
    if(res.data === "Success") {
      toast.success(`Image was successfully deleted.`);
    } else {
      toast.error(`Image deletion failed.`);
    }
    refreshGallery(prev => !prev);
  }

  return (
    <>
    <div className="modal-header">
        <h5 className="modal-title">{title}</h5>
        <p className="modal-title ms-auto">{endDate}</p>
        <Button className="ms-auto" onClick={() => setEditMode(prev => !prev)}>Edit</Button>
        <Button color="light" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></Button>
    </div>
    <div className="modal-body">  
      <h6>Description:</h6>
      <div className="mb-4">{desc}</div>
      <h6>Subtasks:</h6>
      <div className="mb-4">
        <ul className="list-group">
        {subtasks ? subtasks.map((task, index) => { return(
          <li className="list-group-item" key={index}>
             {task}
          </li>
        )}) : <>This task does not have subtasks.</>}
        </ul>
      </div>  
      {images.length > 0 ? 
      <details open={true}>
        <summary><h6 style={{display: "inline"}}>Gallery:</h6></summary>
        <div>
          <ImageGallery ref={imageGallery} items={images} showBullets={true} lazyLoad={true}/>
          <Button className="btn-sm" onClick={() => {
             handleImageDelete(images[imageGallery.current.state.currentIndex].original);
          }}>Delete Current Image</Button>
        </div>
        </details> :
      <></>
      }
     
    </div>             
    <div className="modal-footer">
        <div className="me-auto">
        
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
          : <></> }
          </div>
        <Button color="secondary" data-bs-dismiss="modal">Close</Button>
        {/* <Button data-bs-dismiss="modal" onClick={() => {}}>Save (in progress)</Button> */}
    </div>
    <ToastContainer limit={1}/>
    </>
  )
}

export default TaskDetail