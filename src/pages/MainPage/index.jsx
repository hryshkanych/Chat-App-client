import React, { useEffect, useState } from 'react';
import './styles.css';
import avatarGuestPic from '../../assets/avatar-guest.png';
import MainHeader from '../../components/MainHeader';
import ChatItem from '../../components/ChatItem';
import SingleChatHeader from '../../components/SingleChatHeader';
import { FaArrowRight } from 'react-icons/fa';
import Conversation from '../../components/Conversation';
import { getUserChats, getMessagesInChat, deleteChat } from '../../services/chatService';
import { useUserContext } from '../../contexts/userContext';
import NoConversation from '../../components/NoConversation';
import { useSocketContext } from '../../contexts/socketContext';
import { toast } from 'react-toastify';

function MainPage() {
  const [chats, setChats] = useState([]);
  const [filteredChats, setFilteredChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useUserContext();
  const { socket, onlineUsers } = useSocketContext();

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const userId = user.id;
        const userChats = await getUserChats(userId);
        setChats(userChats);
        filterChats(userChats, searchQuery);
      } catch (error) {
        console.error('Error fetching chats:', error);
      }
    };

    fetchChats();
  }, [user]);

  useEffect(() => {
    if (socket) {
      socket.on('receiveMessage', (newMessage) => {
        const updateChats = (chatList) => {
          const updatedChats = chatList.map((chat) =>
            chat.chatId === newMessage.chatId
              ? { ...chat, lastMessage: newMessage }
              : chat
          );
          return updatedChats.sort((a, b) =>
            new Date(b.lastMessage?.createdAt) - new Date(a.lastMessage?.createdAt)
          );
        };

        const updatedChats = updateChats(chats);
        setChats(updatedChats);
        filterChats(updatedChats, searchQuery);

        if (newMessage.chatId === selectedChat) {
          setMessages((prevMessages) => [...prevMessages, newMessage]);
        } else if (newMessage.senderId !== user.id) {
          toast.info(`${newMessage.senderName}: ${newMessage.text}`);
        }
      });

      return () => {
        socket.off('receiveMessage');
      };
    }
  }, [selectedChat, chats, searchQuery, messages, socket, user.id]);

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

      if (selectedChat === message.chatId) {
        setMessages((prevMessages) => [...prevMessages, message]);
      }

      const updatedChats = chats.map((chat) =>
        chat.chatId === selectedChat
          ? { ...chat, lastMessage: message }
          : chat
      );

      setChats(updatedChats);
      filterChats(updatedChats, searchQuery);
    }
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    filterChats(chats, query);
  };

  const filterChats = (chatList, query) => {
    const lowercasedQuery = query.toLowerCase();
    const filtered = chatList.filter((chat) =>
      chat.user.firstName.toLowerCase().includes(lowercasedQuery) ||
      chat.user.lastName.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredChats(filtered);
  };

  const handleChatCreated = (newChat) => {
    setChats((prevChats) => [...prevChats, newChat]);
    filterChats([...chats, newChat], searchQuery);
  };

  const handleDeleteChat = async (chatId) => {
    try {
      await deleteChat(chatId);

      const updatedChats = chats.filter((chat) => chat.chatId !== chatId);
      setChats(updatedChats);
      filterChats(updatedChats, searchQuery);

      if (selectedChat === chatId) {
        setSelectedChat(null);
        setMessages([]);
      }
    } catch (error) {
      console.error('Error deleting chat:', error);
    }
  };

  const otherUserId = selectedChat
    ? chats.find((chat) => chat.chatId === selectedChat)?.user.otherUserId
    : null;

  const otherUserStatus = otherUserId
    ? (onlineUsers[otherUserId] ? 'online' : 'offline')
    : 'offline';

  return (
    <div className="main-page">
      <div className="general-left-container">
        <MainHeader
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          onChatCreated={handleChatCreated}
          chats={chats}
        />
        <div className="chats-container">
          <a className="chat-text">Chats</a>
          {filteredChats.map((chat) => (
            <ChatItem
              key={chat.chatId}
              otherUserId={chat.user.otherUserId}
              avatarSrc={avatarGuestPic}
              name={`${chat.user.firstName} ${chat.user.lastName}`}
              message={chat.lastMessage ? chat.lastMessage.text : 'No messages yet'}
              date={chat.lastMessage ? new Date(chat.lastMessage.createdAt).toLocaleDateString() : ''}
              status={onlineUsers[chat.user.otherUserId] ? 'online' : 'offline'}
              onClick={() => handleChatClick(chat.chatId)}
              onDelete={() => handleDeleteChat(chat.chatId)}
            />
          ))}
        </div>
      </div>
      <div className="general-right-container">
        {selectedChat ? (
          <>
            <SingleChatHeader
              name={`${chats.find((chat) => chat.chatId === selectedChat).user.firstName}
              ${chats.find((chat) => chat.chatId === selectedChat).user.lastName}`}
              status={otherUserStatus}
            />
            <Conversation messages={messages} />
            <div className="sending-message-container">
              <div className="message-input-container">
                <input
                  type="text"
                  className="message-input"
                  placeholder="Type your message"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <button className="arrow-icon-button">
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
