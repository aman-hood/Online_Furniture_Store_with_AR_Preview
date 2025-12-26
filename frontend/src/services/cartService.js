import axios from "axios";
import http from "./http";
const API = "http://localhost:3000/api/cart";

export const getCart = async () => {
  const res = await http.get(API, { withCredentials: true });
  return res.data.cart;
};

export const addToCart = async (productId, quantity = 1) => {
  const res = await http.post(
    `${API}/add`,
    { productId, quantity },
    { withCredentials: true }
  );
  return res.data.cart;
};

export const removeFromCart = async (productId) => {
  const res = await http.post(
    `${API}/remove`,
    { productId },
    { withCredentials: true }
  );
  return res.data.cart;
};

export const updateCartItem = async (productId, quantity) => {
  const res = await http.post(
    `${API}/update`,
    { productId, quantity },
    { withCredentials: true }
  );
  return res.data.cart;
};

export const clearCart = async () => {
  const res = await http.post(`${API}/clear`, {}, { withCredentials: true });
  return res.data.cart;
};
