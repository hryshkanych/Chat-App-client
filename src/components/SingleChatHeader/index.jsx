import React from 'react';
import './styles.css'; 
import avatarPic from '../../assets/avatar.png';
import Avatar from '../Avatar/index';


function SingleChatHeader({ name, status }) {
    return (
        <div className="single-header-container">
            <Avatar avatarSrc={avatarPic} status={status} />
            <a>{name}</a>
        </div>
    );
}

export default SingleChatHeader;
