import axios from "axios";

const API = "http://localhost:3000/api/wishlist";

export const getWishlist = async () => {
  const res = await axios.get(API, { withCredentials: true });
  return res.data.wishlist;
};

export const addToWishlist = async (productId) => {
  const res = await axios.post(
    `${API}/add`,
    { productId },
    { withCredentials: true }
  );
  return res.data.wishlist;
};

export const removeFromWishlist = async (productId) => {
  const res = await axios.post(
    `${API}/remove`,
    { productId },
    { withCredentials: true }
  );
  return res.data.wishlist;
};
