import http from "./http"; // your axios instance

export const getRooms = async () => {
  const res = await http.get("/api/rooms");
  return res.data;
};
