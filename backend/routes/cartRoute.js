import express from "express";
import { getCart, addToCart, removeFromCart, updateCartItem, clearCart } from "../controllers/cartController.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.get("/", isAuthenticated, getCart);
router.post("/add", isAuthenticated, addToCart);
router.post("/remove", isAuthenticated, removeFromCart);
router.post("/update", isAuthenticated, updateCartItem);
router.post("/clear", isAuthenticated, clearCart);

export default router;
