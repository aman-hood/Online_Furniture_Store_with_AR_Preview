import axios from "axios";

const API = "http://localhost:3000/api/profile";

export const getProfile = async () => {
  const res = await axios.get(`${API}/me`, { withCredentials: true });
  return res.data.user;
};

export const updateProfile = async (payload) => {
  const res = await axios.put(`${API}/me`, payload, { withCredentials: true });
  return res.data.user;
};
