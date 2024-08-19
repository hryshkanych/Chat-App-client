import React, { useState } from 'react';
import './styles.css';
import avatarPic from '../../assets/avatar.png';
import { FaSearch, FaPlus } from 'react-icons/fa';
import Avatar from '../Avatar/index';
import { useNavigate } from 'react-router-dom';
import ModalCreateChat from '../ModalCreateChat';
import { getUserByName } from '../../services/userService';
import { createChat } from '../../services/chatService';
import { useUserContext } from '../../contexts/userContext';
import { toast } from 'react-toastify';

function MainHeader({ searchQuery, onSearchChange, onChatCreated, chats }) {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useUserContext();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/signin');
  };

  const handleCreateChat = async (firstName, lastName) => {
    try {
      if (!firstName.trim() || !lastName.trim()) {
        throw new Error("First name and last name cannot be empty.");
      }

      if (firstName === user.firstName && lastName === user.lastName) {
        throw new Error("You cannot create a chat with yourself.");
      }

      const newUser = await getUserByName(firstName, lastName);

      if (!newUser) {
        throw new Error('User not found');
      }

      const existingChat = chats.find(chat => chat.user.otherUserId === newUser._id);
      if (existingChat) {
        throw new Error("A chat with this user already exists.");
      }

      const participants = [newUser._id, user.id];
      const chat = await createChat(participants);

      const chatDetails = {
        chatId: chat._id,
        user: {
          otherUserId: newUser._id,
          firstName: newUser.firstName,
          lastName: newUser.lastName
        },
        lastMessage: null
      };

      onChatCreated(chatDetails);
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
      toast.error(error.message || 'Failed to create a chat. Please try again.');
    }
  };

  return (
    <header className="main-header-container">
      <div className="top-header-section">
        <div className="header-user-container">
          <Avatar avatarSrc={avatarPic} status="online" />
          <a>{`${user.firstName} ${user.lastName}`}</a>
        </div>
        <button className="logout-button" onClick={handleLogout}>Log Out</button>
      </div>
      <div className="search-container">
        <div className="search-input-container">
          <FaSearch className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search or start new chat"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <button className="add-chat-button" onClick={() => setIsModalOpen(true)}>
          <FaPlus className="plus-icon" />
        </button>
      </div>
      <ModalCreateChat
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateChat}
      />
    </header>
  );
}

export default MainHeader;
