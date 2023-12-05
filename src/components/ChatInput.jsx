import React,{useState} from 'react';
import styled from 'styled-components';
import Picker from "emoji-picker-react";
import {IoMdSend} from "react-icons/io";
import {BsEmojiSmileFill } from "react-icons/bs";


const ChatInput = ({handleSendMsg}) => {
    const [showEmojiPicker,setShowEmojiPicker] = useState(false);
    const [msg,setMsg] = useState("");
    const handleEmojiPickerHideShow = () =>{
        setShowEmojiPicker(!showEmojiPicker);
    };
    const sendChat = (event) =>{
    event.preventDefault(0);
    if(msg.length>0){
      handleSendMsg(msg);
      setMsg("");

    }
  };
  
      return (
        <Container>
          <div className="button-container">
            <div className="emoji">
              <BsEmojiSmileFill onClick={handleEmojiPickerHideShow} />
              {showEmojiPicker && <Picker onEmojiClick={(emojiObject)=> setMsg((prevMsg)=> prevMsg + emojiObject.emoji)} />}
            </div>
          </div>
          <form className="input-container" onSubmit={(e)=>sendChat(e)}>
            <input
              type="text"
              placeholder="type your message"
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
            />
            <button className="submit">
              <IoMdSend />
            </button>
          </form>
        </Container>
      );
    };
const Container = styled.div`
  display: grid; /* Fix: Add a semicolon here */
  grid-template-columns: 5% 95%;
  align-items: center;
  background-color: #080420;
  padding: 0 2rem;
  padding-bottom: 0.3rem;
  @media screen and (min-width: 480px) and (max-width: 1080px) {
    padding: 0 1 rem;
    gap: 1rem;
  }


  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;

    .emoji {
      position: relative;

      svg:not(:root) {
        font-size: 1.5rem;
        color: #ffff00c8;
        cursor: pointer;
      }

      .EmojiPickerReact {
        position: fixed;
        top: 150px;
        background-color: #080420;
        box-shadow: 0 5px 10px #9a86f3;
        border-color: #9186f3;
        .emoji-scroll-wrapper::-webkit-scrollbar{
          background-color: #080420;
          width: 5px;
          &-thumb{
            background-color: #9186f3;
          }
        }
        .epr-emoji-category-label{
          button{
            filter: contrast(0);
          }
        }
        .emoji-search{
          background-color: transparent;
          border-color: #9186f3;

        }
        .emoji-group:before{
          background-color: #080420;

        }

      }
    }
  }

  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-content: center;
    gap: 2rem;
    background-color: #ffffff34;

    input {
      width: 90%;
      //height: 60%;
      background-color: transparent;
      color: white;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;

      &::selection {
        background-color: #9186f3;
      }

      &:focus {
        outline: none;
      }
    }

    button {
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #9a86f3;
      border: none;
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;
        svg{
          font-size: 1rem;

        }
      }

      svg {
        font-size: 2rem;
        color: white;
      }
    }
  }
`;
export default ChatInput;
