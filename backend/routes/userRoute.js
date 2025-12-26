import express from "express";
import bcrypt from "bcryptjs";
import { User } from "../models/userModel.js";
import { isAuthenticated, isAdmin } from "../middlewares/isAuthenticated.js";
import {
  register,
  verify,
  reVerify,
  login,
  logout,
  forgotPassword,
  verifyOTP,
  changePassword,
  allUser,
  getUserById,
} from "../controllers/userController.js";

const router = express.Router();

/* ================= AUTH ================= */
router.post("/register", register);
router.post("/verify", verify);
router.post("/reVerify", reVerify);
router.post("/login", login);
router.post("/logout", isAuthenticated, logout);

/* ================= PROFILE ================= */
router.get("/me", isAuthenticated, (req, res) => {
  res.json({ success: true, user: req.user });
});

router.put("/update", isAuthenticated, async (req, res) => {
  const { firstName, lastName, phoneNo } = req.body;

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { firstName, lastName, phoneNo },
    { new: true }
  ).select("-password");

  res.json({ success: true, user });
});

router.put("/address", isAuthenticated, async (req, res) => {
  const { address, city, zipCode } = req.body;

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { address, city, zipCode },
    { new: true }
  ).select("-password");

  res.json({ success: true, user });
});

router.put("/change-password", isAuthenticated, async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  const user = await User.findById(req.user._id);
  const match = await bcrypt.compare(currentPassword, user.password);

  if (!match)
    return res.status(400).json({ success: false, message: "Wrong password" });

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();

  res.json({ success: true, message: "Password updated" });
});

/* ================= ADMIN ================= */
router.get("/all-users", isAuthenticated, isAdmin, allUser);
router.get("/get-user/:userId", getUserById);

export default router;
