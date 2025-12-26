import express from "express";
import GiftCard from "../models/GiftCard.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const router = express.Router();

const generateCode = () =>
  "GC-" + Math.random().toString(36).substring(2, 8).toUpperCase();

/* CREATE GIFT CARD */
router.post("/", isAuthenticated, async (req, res) => {
  const { amount, email, message } = req.body;

  const gift = await GiftCard.create({
    code: generateCode(),
    amount,
    balance: amount,
    email,
    message,
    user: req.user._id,
  });

  res.json({
    success: true,
    code: gift.code,
    amount: gift.amount,
    email: gift.email,
  });
});

/* VALIDATE GIFT CARD */
router.post("/validate", async (req, res) => {
  const { code } = req.body;

  const giftCard = await GiftCard.findOne({ code });

  if (!giftCard || giftCard.balance <= 0) {
    return res.status(400).json({ valid: false });
  }

  res.json({
    valid: true,
    balance: giftCard.balance,
  });
});

/* GET USER GIFT CARDS */
router.get("/my", isAuthenticated, async (req, res) => {
  const cards = await GiftCard.find({ user: req.user._id })
    .sort({ createdAt: -1 });

  res.json(cards);
});

export default router;
