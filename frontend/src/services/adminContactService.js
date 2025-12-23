import axios from "axios";

const API = "http://localhost:3000/api/admin/contacts";

export const getContactMessages = async () => {
  const res = await axios.get(API, { withCredentials: true });
  return res.data;
};

export const sendReply = async (id, reply) => {
  const res = await axios.post(
    `${API}/${id}/reply`,
    { reply },
    { withCredentials: true }
  );
  return res.data;
};
