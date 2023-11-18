import axios from 'axios';

const baseURL = import.meta.env.VITE_SERVER_URL || 'http://localhost:3500/';

const instance = axios.create({
    baseURL,
    withCredentials: true
})

export default instance;