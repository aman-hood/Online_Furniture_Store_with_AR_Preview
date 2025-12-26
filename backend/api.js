import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.FRONTEND_URL,
  withCredentials: true, // 🔥 THIS IS THE KEY
});

export default api;
