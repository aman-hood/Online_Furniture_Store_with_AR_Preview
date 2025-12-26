import Room from "../models/Room.js";

// GET ALL ROOMS
export const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find({ isActive: true }).sort({ createdAt: 1 });

    const normalizedRooms = rooms.map((r) => ({
      ...r.toObject(),
      img: r.img
        ? `${process.env.BASE_URL}${r.img}`
        : null,
    }));

    res.json(normalizedRooms);
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

    const normalizedRoom = {
      ...room.toObject(),
      img: room.img
        ? `${process.env.BASE_URL}${room.img}`
        : null,
    };

    res.json(normalizedRoom);
  } catch {
    res.status(500).json({ message: "Failed to fetch room" });
  }
};
