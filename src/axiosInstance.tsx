import axios from 'axios';

const apiKey = import.meta.env.VITE_API_KEY;
const axiosInstance = axios.create({
    baseURL: 'http://localhost:5001',
    timeout: 50000,
    headers:{
        'API-Key':apiKey
    }
});

export default axiosInstance;