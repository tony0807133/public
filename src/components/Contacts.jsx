import React,{useState,useEffect} from 'react';
import styled from 'styled-components';
import Logo from "../assets/logo.png"
import { Buffer } from 'buffer';


const Contacts = ({ contacts, currentUser, changeChat }) => {
    const [currentUserName, setCurrentUserName] = useState(undefined);
    const [currentUserImage, setCurrentUserImage] = useState(undefined);
    const [currentSelected, setCurrentSelected] = useState(undefined);

    useEffect(() => {
        if (currentUser) {
            setCurrentUserImage(currentUser.avatarImage);
            setCurrentUserName(currentUser.username);
        }
    }, [currentUser]);

    const changeCurrentChat = (index, contact) => {
        setCurrentSelected(index);
        changeChat(contact);

    };

    return (
        <>
            {currentUserImage && currentUserName && (
                <Container>
                    <div className="brand">
                        <img src={Logo} alt="logo" />
                        <h3>Chatli</h3>
                    </div>
                    <div className="contacts">
                        {contacts.map((contact, index) => (
                            <div
                                className={`contact ${index === currentSelected ? "selected" : ""}`}
                                key={index}
                                onClick={() => changeCurrentChat(index, contact)}
                            >
                                <div className="avatar">
                                    <img
                                        src={`data:image/svg+xml;base64,${Buffer.from(contact.avatarImage).toString("base64")}`}
                                        alt="avatar"
                                    />
                                </div>
                                <div className="username">
                                    <h4>{contact.username}</h4>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="current-user">
                        <div className="avatar">
                            <img
                                src={`data:image/svg+xml;base64,${Buffer.from(currentUserImage).toString("base64")}`}
                                alt="avatar"
                            />
                        </div>
                        <div className="username">
                            <h4>{currentUserName}</h4>
                        </div>
                    </div>
                </Container>
            )}
        </>
    );
};

const Container = styled.div`
display: grid;
grid-template-rows: 10% 75% 15%;
overflow: hidden;
background-color: #080420;
.brand{
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    img{
        height: 2rem;
    }
    h3{
        color: white;
        text-transform: uppercase;

    }
}
.contacts{
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::::-webkit-scrollbar{
        width: 0.2rem;
        &-thumb{
            background-color: #ffffff39;
            width: 0.1rem;
            border-radius: 1rem;
        }
    }
    .contact{
        background-color: #ffffff39;
        min-height: 2rem;
        width: 90%;
        cursor: pointer;
        border-radius: 0.2rem;
        padding: 0.4rem;
        gap: 1rem;
        align-items: center;
        display: flex;
        transition: 0.5s ease-in-out;
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
    .selected{
        background-color: #9186f3;

    }

}
.current-user{
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar{
        img{
            height: 4rem;
            max-inline-size: 100%;

        }
    }
    .username{
        h4{
            color: white;
        }
    }
}
@media screen and (min-width:320px) and (max-width:480px){
    .brand{
        gap: 0.2rem;
        img{
            height: 1.2rem;
        }
        h3{
            font-size: 0.6rem;
        }
    }
    .contacts{
        gap: 0.2rem;
        .contact{
            gap: 0.1rem;
            .avatar{
                img{
                    height: 1.5rem;
                }
            }
            .username{
                h4{
                    font-size: 0.6rem;
                }
            }
        }
    }
    .current-user{
        gap: 0.3rem;
        .avatar{
            img{
                height: 1.5rem;
            }
        }
        .username {
            h4 {
                font-size: 0.6rem;
            }
        }
    }



}


`;

export default Contacts;
