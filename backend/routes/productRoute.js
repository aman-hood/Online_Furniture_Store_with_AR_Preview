import express from "express";
import {
  listProducts,
  getProduct,
  getBestSellers,
} from "../controllers/productController.js";

const router = express.Router();

/* ======================
   🔥 STATIC ROUTES FIRST
   ====================== */
router.get("/best-sellers", getBestSellers);

/* ======================
   NORMAL ROUTES
   ====================== */
router.get("/", listProducts);

/* ======================
   ❗ DYNAMIC ROUTES LAST
   ====================== */
router.get("/:id", getProduct);

export default router;
