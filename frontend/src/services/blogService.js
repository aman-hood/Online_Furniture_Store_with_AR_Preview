import axios from "axios";

const API = "http://localhost:3000/api/blogs";

export const getAllBlogs = async () => {
  const res = await axios.get(API);
  return res.data;
};

export const getBlogBySlug = async (slug) => {
  const res = await axios.get(`${API}/${slug}`);
  return res.data;
};
