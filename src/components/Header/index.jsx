import React from 'react';
import './styles.css'; 
import avatar from '../../assets/avatar.png';
import { FaSearch } from 'react-icons/fa'; 

function Header() {
    return (
        <header className="header-container">
            <div className='top-header-section'>
                <div className="avatar-status">
                    <img src={avatar} alt="User Avatar" className="avatar" />
                    <div className="status-circle online"></div> 
                </div>
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
