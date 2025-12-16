import axios from "axios";

const API = "http://localhost:3000/api/cart";

export const getCart = async () => {
  const res = await axios.get(API, { withCredentials: true });
  return res.data.cart;
};

export const addToCart = async (productId, quantity = 1) => {
  const res = await axios.post(
    `${API}/add`,
    { productId, quantity },
    { withCredentials: true }
  );
  return res.data.cart;
};

export const removeFromCart = async (productId) => {
  const res = await axios.post(
    `${API}/remove`,
    { productId },
    { withCredentials: true }
  );
  return res.data.cart;
};

export const updateCartItem = async (productId, quantity) => {
  const res = await axios.post(
    `${API}/update`,
    { productId, quantity },
    { withCredentials: true }
  );
  return res.data.cart;
};

export const clearCart = async () => {
  const res = await axios.post(`${API}/clear`, {}, { withCredentials: true });
  return res.data.cart;
};
