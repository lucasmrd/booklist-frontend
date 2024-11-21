import axios from 'axios';

const api = axios.create({
  baseURL: 'https://booklist-backend-gjdv.onrender.com/api',
});

export default api;