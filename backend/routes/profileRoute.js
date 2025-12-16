import express from "express";
import { getProfile, updateProfile } from "../controllers/profileController.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.get("/me", isAuthenticated, getProfile);
router.put("/me", isAuthenticated, updateProfile);

export default router;
