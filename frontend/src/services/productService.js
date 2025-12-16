import axios from "axios";

const API = "http://localhost:3000/api/products";

export const listProducts = async (params = {}) => {
  const res = await axios.get(API, { params });
  return res.data.products;
};

export const getProduct = async (id) => {
  const res = await axios.get(`${API}/${id}`);
  return res.data.product;
};
