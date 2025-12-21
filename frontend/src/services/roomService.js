import http from "./http";

export const getRooms = async () => {
  const res = await http.get("/api/rooms");
  return res.data;
};

export const getRoomBySlug = async (slug) => {
  const res = await http.get(`/api/rooms/${slug}`);
  return res.data;
};
