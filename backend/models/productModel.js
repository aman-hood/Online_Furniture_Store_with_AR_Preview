import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, default: "" },
    price: { type: Number, required: true },

    category: { type: String, index: true },   // Beds, Sofas
    room: { type: String, index: true },       // bedroom, living-room

    img: { type: String, default: "" },
    modelUrl: { type: String, default: "" },


    stock: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    isBestSeller: { type: Boolean, default: false },
    isPopular: { type: Boolean, default: false },

    rating: { type: Number, default: 4.5 },
    reviewCount: { type: Number, default: 0 },

    dimensions: {
      width: String,
      height: String,
      depth: String,
    },
    material: String,
    warranty: String,
  },
  { timestamps: true }
);

// ✅ DEFAULT EXPORT (IMPORTANT)
const Product = mongoose.model("Product", productSchema);
export default Product;
