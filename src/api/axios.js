import axios from "axios";

const baseURL =
  import.meta.env.VITE_SERVER_URL ||
  "https://rubricac3backend.onrender.com/api";

const instance = axios.create({
  baseURL,
  withCredentials: true,
});

export default instance;
