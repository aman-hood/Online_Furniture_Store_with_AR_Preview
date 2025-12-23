import axios from "axios";

const API = "http://localhost:3000/api/contact";

export const sendContactMessage = async (data) => {
  const res = await axios.post(API, data);
  return res.data;
};
