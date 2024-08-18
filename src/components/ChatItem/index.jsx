import React from 'react';
import Avatar from '../Avatar';
import './styles.css';
import { FaTrash } from 'react-icons/fa'; // Імпортуйте іконку смітника

const ChatItem = ({ avatarSrc, name, message, date, status, onClick, onDelete }) => {
  return (
    <div className="chat-item" onClick={onClick}>
      <Avatar avatarSrc={avatarSrc} status={status} />
      <div className="chat-content">
        <div className="chat-header">
          <span className="name">{name}</span>
          <div className="end-info">
            <span className="date">{date}</span>
            <button className="trash-button" onClick={(e) => { e.stopPropagation(); onDelete(); }}>
              <FaTrash className="trash-icon" /> {/* Заміна на іконку смітника */}
            </button>
          </div>
        </div>
        <div className="message">{message}</div>
      </div>
    </div>
  );
};

export default ChatItem;
