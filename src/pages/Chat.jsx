import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { allUsersRoute,host } from '../utils/APIRoutes';
import Contacts from '../components/Contacts';
import ChatContainer from '../components/ChatContainer';
import Welcome from '../components/Welcome';
import {io} from "socket.io-client";

const Chat = () => {
    const socket = useRef();
    const navigate = useNavigate();
    const [contacts, setContacts] = useState([]);
    const [currentUser, setCurrentUser] = useState(undefined);
    const [isLoading, setIsLoading] = useState(false);
    const [currentChat, setCurrentChat] = useState(undefined);

    useEffect(() => {
        const checkUser = async () => {
            if (!localStorage.getItem('chat-app-user')) {
                navigate('/login');
            } else {
                setCurrentUser(await JSON.parse(localStorage.getItem('chat-app-user')));
                setIsLoading(true);
            }
        };

        checkUser();
    }, [navigate]);

    useEffect(() => {
        if (currentUser) {
            socket.current = io(host);
    
            socket.current.on("connect", () => {
                console.log("Socket connected");
                socket.current.emit("add-user", currentUser._id);
            });
    
            socket.current.on("connect_error", (error) => {
                console.error("Socket connection error:", error);
                // Handle the error (e.g., show an error message to the user)
            });
        }
        }, [currentUser]);

    useEffect(() => {
        const fetchContacts = async () => {
            if (currentUser) {
                if (currentUser.isAvatarImageSet) {
                    try {
                        const response = await axios.get(`${allUsersRoute}/${currentUser._id}`);
                        setContacts(response.data);
                    } catch (error) {
                        console.error('Error fetching contacts:', error);
                    }
                } else {
                    navigate('/setAvatar');
                }
            }
        };

        if (isLoading && currentUser) {
            fetchContacts();
        }
    }, [currentUser, isLoading, navigate]);

    const handleChatChange = (chat) => {
        setCurrentChat(chat);
    };

    return (
        <Container>
            <div className="ads">
                <script type="text/javascript">
	atOptions = {
		'key' : '033fd87e7b22f0d74610004fb791928c',
		'format' : 'iframe',
		'height' : 50,
		'width' : 320,
		'params' : {}
	};
	document.write('<scr' + 'ipt type="text/javascript" src="//talentednowhere.com/033fd87e7b22f0d74610004fb791928c/invoke.js"></scr' + 'ipt>');
</script>
            </div>
            <div className="container">
                <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange} />
                {isLoading && currentChat === undefined ? (
                    <Welcome currentUser={currentUser} />
                ) : (

                    <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket}/>
                )}
            </div>
                <script async="async" data-cfasync="false" src="//talentednowhere.com/3875534e241c515d6b09d6feeceb94e8/invoke.js"></script>
<div id="container-3875534e241c515d6b09d6feeceb94e8"></div>
        </Container>
    );
};

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    background-color: #131324;
    .container {
        height: 85vh;
        width: 85vw;
        background-color: #00000076;
        display: grid;
        grid-template-columns: 25% 75%;
        @media screen and (min-width: 480px) and (max-width: 1080px) {
            grid-template-columns: 35% 60%;
        }
    }
    @media screen and (min-width:320px) and (max-width:480px){
        height: 100vh;
        width: 100vw;
        grid-template-columns: 35% 60%;
        .container {
            height: 100vh;
            width: 100vw;
        }
    }


`;

export default Chat;
