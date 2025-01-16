
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://social-backend-kbeh.onrender.com/api', 
});

export default instance;
