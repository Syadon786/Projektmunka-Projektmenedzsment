import React, {useState, useEffect, useRef} from 'react'
import Button from '../../components/Button/Button';
import Conversation from '../../components/Conversation/Conversation';
import Message from '../../components/Message/Message';
import Page from "../../components/Page/Page"
import { useAuth } from '../../contexts/AuthContext';
import { useProject } from '../../contexts/ProjectContext';
import request from '../../util/request';

import { v4 as uuidv4 } from 'uuid';
import {io} from "socket.io-client";

import "./MessengerPage.css";

const MessengerPage = () => {
   const {user} = useAuth();
   const {actProject} = useProject();
   const [prevChat, setPrevChat] = useState(null);
   const [currentChat, setCurrentChat] = useState(null)
   const [messages, setMessages] = useState([])
   const [conversations, setConversations] = useState([]);
   const [newMessage, setNewMessage] = useState("");
   const [arrivalMessage, setArrivalMessage] = useState(null);
   const scrollRef = useRef();
   const socket = useRef();

   useEffect(() => {
      const fetchMessages = async () => {
        const res = await request.get(`/conversations/${actProject.value}`);
        if(res.data) {
          console.log(res.data);
          setConversations(res.data);
          if(prevChat) {
            socket.current?.emit("leaveRoom", {userId: user.googleId, conversationId: prevChat._id})
          }
          setCurrentChat(res.data[0]);
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

   useEffect(() => {
    scrollRef.current?.scrollIntoView({behavior: "smooth"});
  }, [messages]);

   useEffect(() => {
    socket.current = io(process.env.REACT_APP_WEBSOCKET);
    socket.current.on("getMessage", data => {
      setArrivalMessage({
         sender: data.senderId,
         text: data.text,
         createdAt: Date.now()
      })
    })
  }, [])

  useEffect(() => {
    arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) &&
    setMessages(prev => [...prev, arrivalMessage])
  }, [arrivalMessage, currentChat])

  useEffect(() => {
    if(currentChat) {
      socket.current?.emit("sendUser", {userId: user.googleId, conversationId: currentChat._id})
      socket.current?.on("getUsers", users => {
        console.log(users);
      })
      setPrevChat(currentChat);
  }
  }, [user, currentChat]);

  useEffect(() => {
    socket.current?.on("welcome", message=> {
      console.log(message);
    })
  }, [socket]);

   const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      _id: uuidv4(),
      sender: user.googleId,
      text: newMessage,
      conversationId: currentChat._id
    };

    socket.current.emit("sendMessage", {
      senderId: user.googleId,
      text: newMessage,
      conversationId: currentChat._id
    })

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
                <div  key={c?._id}  onClick={() => {
                  setCurrentChat(c);
                }
               }>
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
                    messages.map(m=> 
                    <div key={m._id} ref={scrollRef}>
                      <Message message={m} own={m.sender === user.googleId}/>
                    </div>
                    )  
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