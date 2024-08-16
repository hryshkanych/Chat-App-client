import React from 'react';
import './styles.css'; 
import avatarPic from '../../assets/avatar.png';
import { FaSearch } from 'react-icons/fa'; 
import Avatar from '../Avatar/index';
import { useNavigate } from 'react-router-dom';

function MainHeader() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/signin'); 
    };

    return (
        <header className="main-header-container">
            <div className='top-header-section'>
                <Avatar avatarSrc={avatarPic} status="online" />
                <button className="logout-button" onClick={handleLogout}>Log Out</button>
            </div>
            <div className="search-container">
                <div className="search-input-container">
                    <FaSearch className="search-icon" /> 
                    <input 
                        type="text" 
                        className="search-input" 
                        placeholder="Search or start new chat" 
                    />
                </div>
            </div>
        </header>
    );
}

export default MainHeader;
