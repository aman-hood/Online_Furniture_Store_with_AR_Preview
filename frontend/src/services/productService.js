import http from "./http";

const API = "/api/products";

export const listProducts = async (params = {}) => {
  const res = await http.get(API, { params });
  return res.data.products;
};


export const getProduct = async (id) => {
  const res = await http.get(`${API}/${id}`);
  return res.data.product;
};

export const createProduct = async (data) => {
  const res = await http.post(API, data);
  return res.data.product;
};

export const updateProduct = async (id, data) => {
  const res = await http.put(`${API}/${id}`, data);
  return res.data.product;
};

export const deleteProduct = async (id) => {
  const res = await http.delete(`${API}/${id}`);
  return res.data;
};
