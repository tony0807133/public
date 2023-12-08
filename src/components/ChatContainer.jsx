import React,{useState,useEffect, useRef} from 'react';
import styled from 'styled-components';
import { Buffer } from 'buffer';
import Logout from './Logout';
import ChatInput from './ChatInput';
import axios from "axios";
import { getAllMessagesRoute, sendMessageRoute } from '../utils/APIRoutes';
import {v4 as uuidv4} from "uuid";

const ChatContainer = ({ currentChat, currentUser, socket }) => {
    const [messages, setMessages] = useState([]);
    const [arrivalMessage,setArrivalMessage] = useState(null);
    const scrollRef = useRef();

    useEffect(() => {
      const fetchMessages = async () => {
        try {
          if(currentChat){
          const response = await axios.post(getAllMessagesRoute, {
            from: currentUser._id,
            to: currentChat._id,
          });
          setMessages(response.data);}
        } catch (error) {
          console.error('Error fetching messages:', error);
        }
      };
    
      if (currentChat) {
        fetchMessages();
      }
    }, [currentChat, currentUser]);

  const handleSendMsg = async (msg) => {
    await axios.post(sendMessageRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    });
    socket.current.emit("send-msg",{
      to: currentChat._id,
      from: currentUser._id,
      message: msg,
    });
    const msgs = [...messages];
    msgs.push({fromSelf:true,message:msg});
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage((prevArrivalMessage) => ({
          ...prevArrivalMessage,
          fromSelf: false,
          message: msg,
        }));
      });
    }
  }, [socket, setArrivalMessage]);
  

  useEffect(()=>{
    arrivalMessage && setMessages((prev)=>[...prev,arrivalMessage]);

  },[arrivalMessage]);

  useEffect(()=>{
    scrollRef.current?.scrollIntoView({behaviour:"smooth"});
  },[messages]);

  return (
    <>
      {currentChat && (
        <Container>
          <div className="chat-header">
            <div className="user-details">
              <div className="avatar">
                <img
                  src={`data:image/svg+xml;base64,${Buffer.from(
                    currentChat.avatarImage
                  ).toString('base64')}`}
                  alt="avatar"
                />
              </div>
              <div className="username">
                <h4>{currentChat.username}</h4>
              </div>
            </div>
            <Logout />
          </div>
          <div className="chat-messages">
            {messages.map((message) => (
              <div ref={scrollRef} key={uuidv4._id}>
                <div
                  className={`message ${
                    message.fromSelf ? 'sended' : 'received'
                  }`}
                >
                  <div className="content">
                    <p>{message.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <ChatInput handleSendMsg={handleSendMsg} />
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
padding-top: 1rem;
display:grid;
grid-templet-rows: 10% 78% 12%;
gap: 0.1rem;
overflow: hidden;
@media screen and (min-width: 480px) and (max-width: 1080px) {
  grid-auto-rows: 15% 70% 15%;
}

.chat-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.2rem;
    .user-details{
        display: flex;
        align-items: center;
        gap: 1rem;
        .avatar{
            img{
                height: 3rem;
            }
        }
        .username{
            h4{
                color: white;
            }
        }
    }
}
.chat-messages{
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow: auto;
  &::-webkit-scrollbar{
    width: 0.2rem;
    &-thumb{
      background-color: #ffffff39;
      width: 0.1rem;
      border-radius: 1rem;
    }
  }
  .message{
    display: flex;
    align-items: center;
    .content{
      max-width: 40%;
      overflow-wrap: break-word;
      padding: 1rem;
      font-size: 1.1rem;
      border-radius: 1rem;
      color: #d1d1d1;
    }
  }
  .sended{
    justify-content: flex-end;
    .content{
      background-color: #4f04ff21;
    }
  }
  .recieved{
    justify-content: flex-start;
    .content{
      background-color: #9900ff20;
    }
  }
}

@media screen and (min-width:320px) and (max-width:480px){
  padding-top: 0.5rem;
  .chat-header{
    .user-details{
      gap: 0.5rem;
      .avatar{
        img{
          height: 2rem;
        }
      }
      .username{
        h4{
          font-size: 0.8rem;
        }
      }
    }
  }
  .chat-messages{
    padding: 0.5rem 0.5rem;
    gap: 0.4rem;
    .message{
      .content{
        max-width: 100%;
        font-size: 0.6rem;
      }
    }
  }
}
`;
export default ChatContainer;
