// src/axiosConfig.js
import axios from 'axios';

const token = localStorage.getItem('access');

const instance = axios.create({
  baseURL: 'http://localhost:8000/',  // URL base de tu backend Django
  headers: {
    Authorization: token ? `Bearer ${token}` : '',
    'Content-Type': 'application/json',
  },
});

export default instance;
