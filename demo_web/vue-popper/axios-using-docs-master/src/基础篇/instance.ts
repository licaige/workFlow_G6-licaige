import axios from 'axios';

const instance = axios.create({
  timeout: 10000,
  baseURL: '/api',
});

export default instance;
