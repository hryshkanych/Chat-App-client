import axios from 'axios';

const API_URL = 'http://localhost:3000/api'; 

export const getUserChats = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/chats/${userId}`);
    return response.data.chats;
  } catch (error) {
    console.error('Error fetching user chats:', error);
    throw error;
  }
};

export const createChat = async (participants) => {
  try {
    const response = await axios.post(`${API_URL}/chats`, { participants });
    return response.data.chat;
  } catch (error) {
    console.error('Error creating chat:', error);
    throw error;
  }
};

export const getMessagesInChat = async (chatId) => {
  try {
    const response = await axios.get(`${API_URL}/messages/${chatId}`);
    return response.data.messages;
  } catch (error) {
    console.error('Error fetching messages:', error);
    throw error;
  }
};


export const sendMessage = async (senderId, chatId, text) => {
  try {
    const response = await axios.post(`${API_URL}/messages`, { senderId, chatId, text });
    return response.data.message;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};
