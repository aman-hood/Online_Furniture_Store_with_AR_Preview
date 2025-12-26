import axios from "axios";
import http from "./http";

const API = "http://localhost:3000/api/wishlist";

export const getWishlist = async () => {
  const res = await http.get(API, { withCredentials: true });
  return res.data.wishlist.items;
};

export const addToWishlist = async (productId) => {
  const res = await http.post(
    `${API}/add`,
    { productId },
    { withCredentials: true }
  );
  return res.data.wishlist;
};

export const removeFromWishlist = async (productId) => {
  const res = await http.post(
    `${API}/remove`,
    { productId },
    { withCredentials: true }
  );
  return res.data.wishlist;
};
