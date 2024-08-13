import React from 'react';
import './styles.css'; 
import avatarPic from '../../assets/avatar.png';
import { FaSearch } from 'react-icons/fa'; 
import Avatar from '../Avatar/index';

function Header() {
    return (
        <header className="header-container">
            <div className='top-header-section'>
                <Avatar avatarSrc={avatarPic} status="online" />
                <button className="logout-button">Log Out</button>
            </div>
            <div className="search-container">
                <FaSearch className="search-icon" /> 
                <input 
                    type="text" 
                    className="search-input" 
                    placeholder="Search or start new chat" 
                />
            </div>
        </header>
    );
}

export default Header;
