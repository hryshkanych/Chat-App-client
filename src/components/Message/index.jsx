import React from 'react';
import './styles.css'; 
import avatarGuestPic from '../../assets/avatar-guest.png';

const ReceivedMessage = ({ text, time }) => {
  return (
    <div className="chat-bubble-wrapper">
        <img src={avatarGuestPic} alt="Avatar" className="chat-avatar-pic" />
        <div className="chat-bubble received">
            <div className="chat-bubble-content">
                <p className="chat-content-text">{text}</p>
                <span className="chat-time">{time}</span>
            </div>
        </div>
    </div>
  );
};

const SentMessage = ({ text, time }) => {
  return (
    <div className="chat-bubble sent">
      <div className="chat-bubble-content">
        <p  className="chat-content-text">{text}</p>
        <span className="chat-time">{time}</span>
      </div>
    </div>
  );
};

export { ReceivedMessage, SentMessage };
