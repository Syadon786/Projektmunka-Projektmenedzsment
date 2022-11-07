import React, {useState, useEffect} from 'react'
import { useAuth } from '../../contexts/AuthContext';
import request from '../../util/request';
import "./Message";

import "./Message.css";

const Message = ({message, own}) => {
  const {user} = useAuth();
  const [avatar, setAvatar] = useState("");
  
  useEffect(() => {
    const fetchSenderAvatar = async () => {
       const res = await request.get(`/messages/${message.sender}/photo`);
       if(res.data !== 'Failure') {
          setAvatar(res.data.photo);
       }
      }  
    fetchSenderAvatar();
  }, [message]);

  return (
    <div className={`message ${own ? "own" : ""}`}>
        <div className="messageTop">
             <img className="messageImg" 
             src={message.sender === user.googleId ? user.photo 
              : avatar} 
             referrerPolicy="referrer" alt="profile"/> 
             <p className="messageText">
              {message.text}
             </p>
        </div>
        <div className="messageBottom">
            {message.createdAt}
        </div>

    </div>
  )
}

export default Message