import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // Base URL for your backend
  withCredentials: true, // Include credentials (cookies) in requests
});

export default api;
