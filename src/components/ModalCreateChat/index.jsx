// ModalCreateChat.js
import React, { useState } from 'react';
import './styles.css'; // Ensure this file includes styles in rem units
import { FaTimes } from 'react-icons/fa';

function ModalCreateChat({ isOpen, onClose, onCreate }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleCreateClick = () => {
    onCreate(firstName, lastName);
    setFirstName('');
    setLastName('');
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close-button" onClick={onClose}>
          <FaTimes className="close-icon" />
        </button>
        <h2>Create New Chat</h2>
        <div className='creating-chat-form'>
            <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            />
            <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            />
            <button className="create-button" onClick={handleCreateClick}>
            Create
            </button>
        </div>
      </div>
    </div>
  );
}

export default ModalCreateChat;
