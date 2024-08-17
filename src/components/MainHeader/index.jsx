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
import { toast } from 'react-toastify'; // Import toast

function MainHeader({ searchQuery, onSearchChange, onChatCreated }) {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { user } = useUserContext();

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/signin'); 
    };

    const handleCreateChat = async (firstName, lastName) => {
        try {
            const newUser = await getUserByName(firstName, lastName);

            if (newUser) {
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
            } else {
                toast.error('User not found'); // Show error message
            }
        } catch (error) {
            console.error('Error creating chat:', error);
            toast.error('Failed to create a chat. User doesn`t exist or you have entered incorrect data.'); // Show error message
        }
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
