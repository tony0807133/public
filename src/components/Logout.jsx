import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {BiPowerOff} from "react-icons/bi";
const Logout = () => {
    const navigate = useNavigate();
    const handleClick = async ()=>{
        localStorage.clear();
        navigate("/login");
    };

    return (
        <Button onClick={handleClick}>
            <BiPowerOff/>
            
        </Button>
    );
}
const Button = styled.div`
display: flex;
justify-content: center;
align-items: center;
padding: 0.5rem;
border-radius: 0.5rem;
background-color: #9a86f3;
border: none;
cursor: pointer;
svg{
    font-size: 1.3rem;
    color: #ebe7ff;
}
@media screen and (min-width:320px) and (max-width:480px){
    svg{
        font-size: 1rem;
    }
}

`;

export default Logout;
