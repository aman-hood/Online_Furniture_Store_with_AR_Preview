import express from "express";
import Contact from "../models/contactModel.js";
import { replyToContact } from "../controllers/adminContactController.js";
import { isAuthenticated, isAdmin } from "../middlewares/isAuthenticated.js";

const router = express.Router();

// GET all messages
router.get("/", isAuthenticated, isAdmin, async (req, res) => {
  const messages = await Contact.find().sort({ createdAt: -1 });
  res.json(messages);
});

// POST reply
router.post("/:id/reply", isAuthenticated, isAdmin, replyToContact);

export default router;
