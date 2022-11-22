import React, {useState} from 'react'
import { useEffect } from 'react';
import AvatarGroup from '@atlaskit/avatar-group';

import request from '../../util/request';

import "./Conversation.css"

const Conversation = ({conversation, currentUser, selected, actProject}) => {

  const [otherUsers, setOtherUsers] = useState([]);
  const [label, setLabel] = useState("");

  useEffect(() => {
       const fetchUsers = async() => {
          const res = await request.post("/conversations/users", {
            userIds: others
          })
          if(res.data) {
            console.log(res);
            setOtherUsers(res.data);
          }
       }
      const others = conversation.members.filter(m => m !== currentUser.googleId);
      fetchUsers();
  }, [conversation, currentUser.googleId])

  useEffect(() => {
    if(conversation.isTaskChat) {
        const fetchTaskName = async () => {
          const res = await request.get(`/task/name/${conversation._id}`)
          if(res.data) {
            console.log("Task name", res.data);
            setLabel(res.data.title);
          }
        }
        fetchTaskName();
    } 
  }, [conversation])


  return (
    <div className={`conversation ${selected ? "selected" : ""}`}>
        {otherUsers ?        
        <>
          <AvatarGroup appearance="stack" maxCount={4} data={
            [
            {
              email: currentUser.email,
              key: currentUser.googleId,
              name: currentUser.name,
              src: currentUser.photo
            },
            ...otherUsers.map(otherUser => ({
              email: otherUser.email,
              key: otherUser._id,
              name: otherUser.name,
              src: otherUser.photo 
            }))
          ]
          } /> 
          <span className='conversationName'>{conversation.isTaskChat ? label : actProject.label}</span>   
        </> :
        null
        }

    </div>
  )
}

export default Conversation