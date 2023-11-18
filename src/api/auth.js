import axios from "./axios";

export const registerRequest = (user) => axios.post('/create', user);
export const LoginRequest = (user) => axios.post('/login', user);
export const verifyTokenReques = () => axios.get('/auth/verify')
export const LoginoutRequest = () => axios.post('/logout')
