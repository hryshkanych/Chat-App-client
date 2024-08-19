import React from 'react';
import './styles.css';
import avatarGuestPic from '../../assets/avatar-guest.png';

const ReceivedMessage = ({ text, createdAt }) => {
  return (
    <div className="chat-bubble-wrapper">
      <img src={avatarGuestPic} alt="Avatar" className="chat-avatar-pic" />
      <div className="chat-bubble received">
        <div className="chat-bubble-content">
          <p className="chat-content-text">{text}</p>
          <span className="chat-time">{createdAt}</span>
        </div>
      </div>
    </div>
  );
};

const SentMessage = ({ text, createdAt }) => {
  return (
    <div className="chat-bubble sent">
      <div className="chat-bubble-content">
        <p className="chat-content-text">{text}</p>
        <span className="chat-time">{createdAt}</span>
      </div>
    </div>
  );
};

export { ReceivedMessage, SentMessage };
