import React, {useState, useEffect} from 'react'
import Button from '../../components/Button/Button';
import Conversation from '../../components/Conversation/Conversation';
import Message from '../../components/Message/Message';
import Page from "../../components/Page/Page"
import { useAuth } from '../../contexts/AuthContext';
import { useProject } from '../../contexts/ProjectContext';
import request from '../../util/request';

import { v4 as uuidv4 } from 'uuid';

import "./MessengerPage.css";

const MessengerPage = () => {
   const {user} = useAuth();
   const {actProject} = useProject();
   const [currentChat, setCurrentChat] = useState(null)
   const [messages, setMessages] = useState([])
   const [conversations, setConversations] = useState([]);
   const [newMessage, setNewMessage] = useState("");

   useEffect(() => {
      const fetchMessages = async () => {
        const res = await request.get(`/conversations/${actProject.value}`);
        if(res.data) {
          console.log(res.data);
          setConversations(res.data);
        }
      }
      fetchMessages();
   }, [actProject])

   useEffect(() => {
      const fetchMessages = async () => {
        const res = await request.get(`/messages/${currentChat?._id}`)
        if(res.data) {
          setMessages(res.data);
        }
      }
      fetchMessages();
   }, [currentChat])

   const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      _id: uuidv4(),
      sender: user.googleId,
      text: newMessage,
      conversationId: currentChat._id
    };

    const res = await request.post("/messages", message)
    if(res.data !== 'Failure') {
      console.log(res.data);
      setMessages([...messages, res.data])
    }
  }

  return (
    <Page title=""className="messenger" noCard>
        <div className="chatMenu">
            <div className="chatMenuWrapper">
              <input className='chatMenuInput' placholder="Search for chat"/>
              {conversations ? 
              <> {conversations.map(c => 
                <div  key={c?._id}  onClick={() => setCurrentChat(c)}>
                  <Conversation conversation={c} actProject={actProject} currentUser={user}/>
                </div>
              )}
              </> 
              : null}
            </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            { 
              currentChat ? 
                <>         
                <div className="chatBoxTop">
                  {messages 
                  ? 
                    messages.map(m=> <Message  key={m._id} message={m} own={m.sender === user.googleId}/>)
                  : null}
              
                </div>
                <div className="chatBoxBottom">
                  <textarea className="chatMessageInput" 
                  onChange={(e) => setNewMessage(e.target.value)} 
                  value={newMessage}
                  placeholder='write something...'></textarea>
                  <Button onClick={(e) => {
                    handleSubmit(e); 
                    setNewMessage("")
                    }}>Send</Button> 
                </div>  
                </>
                :
                <span className="noConversationText">Open a conversation</span>
              }
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
                online
          </div>
        </div>
    </Page>
  )
}

export default MessengerPage