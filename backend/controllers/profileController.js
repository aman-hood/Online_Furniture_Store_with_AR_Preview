import { User } from "../models/userModel.js";

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.id).select("-password -otp -otpExpiry -token");
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    res.status(200).json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const allowed = ["firstName", "lastName", "address", "city", "zipCode", "phoneNo", "profilePic", "profilePicPublicId"]; 
    const updates = {};
    for (const key of allowed) if (key in req.body) updates[key] = req.body[key];

    const user = await User.findByIdAndUpdate(req.id, updates, { new: true }).select("-password -otp -otpExpiry -token");
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    res.status(200).json({ success: true, user });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
