import React, { useEffect, useState } from 'react';
import './styles.css';
import { io } from 'socket.io-client';
import avatarGuestPic from '../../assets/avatar-guest.png';
import MainHeader from '../../components/MainHeader';
import ChatItem from '../../components/ChatItem';
import SingleChatHeader from '../../components/SingleChatHeader';
import { FaArrowRight } from 'react-icons/fa';
import Conversation from '../../components/Conversation';
import { getUserChats, getMessagesInChat } from '../../services/chatService';
import { useUserContext } from '../../contexts/userContext';
import NoConversation from '../../components/NoConversation';

const socket = io('http://localhost:3000');

function MainPage() {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [onlineUsers, setOnlineUsers] = useState({});
  const { user } = useUserContext();

  useEffect(() => {
    // Notify server of user connection
    socket.emit('userConnected', user.id);

    // Handle updates to online users
    socket.on('updateUserList', (users) => {
      setOnlineUsers(users);
    });

    return () => {
      socket.off('updateUserList');
    };
  }, [user.id]);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const userId = user.id;
        const userChats = await getUserChats(userId);
        setChats(userChats);
      } catch (error) {
        console.error('Error fetching chats:', error);
      }
    };

    fetchChats();
  }, [user]);

  useEffect(() => {
    if (selectedChat) {
      socket.emit('joinChat', { chatId: selectedChat });

      socket.on('receiveMessage', (message) => {
        if (message.chatId === selectedChat) {
          setMessages((prevMessages) => [...prevMessages, message]);
        }

        // Update last message in chat list and sort chats
        setChats((prevChats) => {
          const updatedChats = prevChats.map((chat) =>
            chat.chatId === message.chatId
              ? { ...chat, lastMessage: message }
              : chat
          );
          return updatedChats.sort((a, b) =>
            new Date(b.lastMessage?.createdAt) - new Date(a.lastMessage?.createdAt)
          );
        });
      });
    }

    return () => {
      socket.off('receiveMessage');
    };
  }, [selectedChat]);

  const handleChatClick = async (chatId) => {
    try {
      setSelectedChat(chatId);
      const chatMessages = await getMessagesInChat(chatId);
      setMessages(chatMessages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedChat) {
      const message = {
        senderId: user.id,
        chatId: selectedChat,
        text: newMessage,
        createdAt: new Date().toISOString(), 
      };
      socket.emit('sendMessage', message);
      setNewMessage('');

      // Update last message in chat list and sort chats
      setChats((prevChats) => {
        const updatedChats = prevChats.map((chat) =>
          chat.chatId === selectedChat
            ? { ...chat, lastMessage: message }
            : chat
        );
        return updatedChats.sort((a, b) =>
          new Date(b.lastMessage?.createdAt) - new Date(a.lastMessage?.createdAt)
        );
      });
    }
  };

  // Find the other user ID in the selected chat
  const otherUserId = selectedChat 
    ? chats.find(chat => chat.chatId === selectedChat)?.user.otherUserId 
    : null;

  // Determine the status of the other user
  const otherUserStatus = otherUserId 
    ? (onlineUsers[otherUserId] ? 'online' : 'offline') 
    : 'offline';

  return (
    <div className="Main-page">
      <div className="General-left-container">
        <MainHeader />
        <div className="Chats-container">
          <a className="Chat-text">Chats</a>
          {chats.map(chat => (
            <ChatItem
              key={chat.chatId}
              otherUserId={chat.user.otherUserId}
              avatarSrc={avatarGuestPic}
              name={`${chat.user.firstName} ${chat.user.lastName}`}
              message={chat.lastMessage ? chat.lastMessage.text : 'No messages yet'}
              date={chat.lastMessage ? new Date(chat.lastMessage.createdAt).toLocaleDateString() : ''}
              status={onlineUsers[chat.user.otherUserId] ? 'online' : 'offline'}
              onClick={() => handleChatClick(chat.chatId)}
            />
          ))}
        </div>
      </div>
      <div className="General-right-container">
        {selectedChat ? (
          <>
            <SingleChatHeader 
              name={`${chats.find(chat => chat.chatId === selectedChat).user.firstName} 
              ${chats.find(chat => chat.chatId === selectedChat).user.lastName}`} 
              status={otherUserStatus}
            />
            <Conversation messages={messages} />
            <div className="Sending-message-container">
              <div className="Message-input-container">
                <input 
                  type="text" 
                  className="message-input" 
                  placeholder="Type your message" 
                  value={newMessage} 
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <button className='arrow-icon-button'>
                  <FaArrowRight className="arrow-icon" onClick={handleSendMessage} /> 
                </button>
              </div>
            </div>
          </>
        ) : (
          <NoConversation />
        )}
      </div>
    </div>
  );
}

export default MainPage;
