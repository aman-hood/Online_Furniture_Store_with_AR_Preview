import axios from "axios";

const API = "http://localhost:3000/api/reviews";

export const getReviews = async (productId) => {
  const res = await axios.get(`${API}/${productId}`);
  return res.data;
};

export const addReview = async (data) => {
  const res = await axios.post(API, data, { withCredentials: true });
  return res.data;
};
