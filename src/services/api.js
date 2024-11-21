import axios from 'axios';

const api = axios.create({
  baseURL: 'https://booklist-backend-gjdv.onrender.com:8080/api',
});

export default api;