import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import './styles/Header.css'

import Profile from '../uiComponents/profile.svg';
import Chat from '../uiComponents/chat.svg';

function Header() {
    return (
        <div className="main-header">
            <Link to="/student/basicInfo">
                <button className="headerbutton">
                <img src={Profile} alt="Profile" className="headerimg" />
                </button>
            </Link>
            
            <img className="header_logo" src="https://1000logos.net/wp-content/uploads/2018/07/tinder-logo.png" alt="tinder logo"/>
            <button className="headerbutton">
            <img src={Chat} alt="Chat" className="headerimg" />
            </button>
        </div>
    )
}

    /* SVGs also hosted at 
        Profile: https://svgshare.com/i/Rrq.svg
        Chat: https://svgshare.com/i/RrK.svg  
    */

export default Header;