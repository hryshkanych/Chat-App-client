import React from 'react';
import './styles.css'; 
import avatarPic from '../../assets/avatar.png';
import Avatar from '../Avatar/index';

function SingleChatHeader() {
    return (
        <div className="single-header-container">
            <Avatar avatarSrc={avatarPic} status="online" />
        </div>
    );
}

export default SingleChatHeader;
