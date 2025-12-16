import express from "express";
import { listProducts, getProduct, createProduct, updateProduct, deleteProduct } from "../controllers/productController.js";
import { isAuthenticated, isAdmin } from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.get("/", listProducts);
router.get("/:id", getProduct);
router.post("/", isAuthenticated, isAdmin, createProduct);
router.put("/:id", isAuthenticated, isAdmin, updateProduct);
router.delete("/:id", isAuthenticated, isAdmin, deleteProduct);

export default router;
