import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api', // adjust as needed
  withCredentials: true // 🔐 allow cookies to be sent
});

export default api;
