import axios from 'axios';

const API_URL = 'http://localhost:3000/api/users';

export const signupUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, userData, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

export const signinUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/signin`, userData, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error('Error signing in user:', error);
    throw error;
  }
};


export const getUserByName = async (firstName, lastName) => {
  try {
    const response = await axios.post(`${API_URL}/getUserByName`, { firstName, lastName });
    console.log('dfdfdfdfdf    '+response.data.user._id);
    
    return response.data.user;
  } catch (error) {
    console.error('Error fetching user by name:', error);
    throw error;
  }
};