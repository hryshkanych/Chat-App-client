import React from 'react';
import Avatar from '../Avatar';
import './styles.css';
import { FaEllipsisH } from 'react-icons/fa'; // Імпортуйте іконку трьох крапок

const ChatItem = ({ avatarSrc, name, message, date, status }) => {
  return (
    <div className="chat-item">
      <Avatar avatarSrc={avatarSrc} status={status} />
      <div className="chat-content">
        <div className="chat-header">
          <span className="name">{name}</span>
          <div className="end-info">
            <span className="date">{date}</span>
            <button className="settings-button">
              <FaEllipsisH className="rotated-icon" />
            </button>
          </div>
        </div>
        <div className="message">{message}</div>
      </div>
    </div>
  );
};

export default ChatItem;
