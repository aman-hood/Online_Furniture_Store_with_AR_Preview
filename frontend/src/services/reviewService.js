import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export const getReviews = async (productId) => {
  const res = await http.get(`/api/reviews/${productId}`);
  return res.data;
};

export const addReview = async ({ productId, rating, comment }) => {
  const res = await http.post("/api/reviews", {
    productId,
    rating,
    comment,
  });
  return res.data;
};
