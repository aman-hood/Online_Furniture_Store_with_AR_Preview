import express from "express";
import { getReviews, addReview } from "../controllers/reviewController.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.get("/:productId", getReviews);
router.post("/", isAuthenticated, addReview);

export default router;
