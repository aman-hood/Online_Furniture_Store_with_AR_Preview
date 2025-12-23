import { Review } from "../models/reviewModel.js";
import Product from "../models/productModel.js";

export const getReviews = async (req, res) => {
  const { productId } = req.params;
  const reviews = await Review.find({ product: productId })
    .sort({ createdAt: -1 });
  res.json(reviews);
};

export const addReview = async (req, res) => {
  const { productId, rating, comment } = req.body;

  const already = await Review.findOne({
    product: productId,
    user: req.id,
  });
  if (already)
    return res.status(400).json({ message: "Already reviewed" });

  const review = await Review.create({
    product: productId,
    user: req.id,
    name: req.user.name,
    rating,
    comment,
  });

  // update product rating
  const reviews = await Review.find({ product: productId });
  const avg =
    reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;

  await Product.findByIdAndUpdate(productId, {
    rating: avg,
    reviewCount: reviews.length,
  });

  res.json(review);
};
