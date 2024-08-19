import axios from 'axios';

const API_URL = 'https://api.quotable.io/random';

export const getRandomQuote = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.content;
  } catch (error) {
    throw new Error('Error fetching quote');
  }
};