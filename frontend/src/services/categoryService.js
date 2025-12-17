import http from "./http";

const API = "/api/categories";

export const listCategories = async (params = {}) => {
  const res = await http.get(API, { params });
  return res.data.categories;
};

export const createCategory = async (data) => {
  const res = await http.post(API, data);
  return res.data.category;
};

export const updateCategory = async (id, data) => {
  const res = await http.put(`${API}/${id}`, data);
  return res.data.category;
};

export const deleteCategory = async (id) => {
  const res = await http.delete(`${API}/${id}`);
  return res.data;
};
