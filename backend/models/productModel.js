import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, default: "" },
    price: { type: Number, required: true },
    category: { type: String, index: true },
    imageUrl: { type: String, default: "" },
    stock: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    isBestSeller: {type: Boolean,default: false },
    isPopular: {type: Boolean,default: false },
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
