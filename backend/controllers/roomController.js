import Room from "../models/Room.js";

// GET ALL ROOMS
export const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find({ isActive: true }).sort({ createdAt: 1 });
    res.json(rooms);
  } catch {
    res.status(500).json({ message: "Failed to fetch rooms" });
  }
};

// GET ROOM BY SLUG
export const getRoomBySlug = async (req, res) => {
  try {
    const room = await Room.findOne({
      slug: req.params.slug,
      isActive: true,
    });

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    res.json(room);
  } catch {
    res.status(500).json({ message: "Failed to fetch room" });
  }
};
