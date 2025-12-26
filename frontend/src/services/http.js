import axios from "axios";
console.log("API URL:", import.meta.env.VITE_API_URL);

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});


export default http;
