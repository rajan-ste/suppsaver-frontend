import axios from 'axios';
import AuthService from '../services/AuthService';

axios.interceptors.request.use(config => {
    const token = AuthService.getToken(); 
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

export default axios;
