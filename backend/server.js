import dotenv from "dotenv";
dotenv.config();
import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./database/db.js";
import userRoute from "./routes/userRoute.js";
import productRoute from "./routes/productRoute.js";
import cartRoute from "./routes/cartRoute.js";
import wishlistRoute from "./routes/wishlistRoute.js";
import profileRoute from "./routes/profileRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import { Category } from "./models/categoryModel.js";
import uploadRoutes from "./routes/uploadRoutes.js";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);


app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  console.log("REQUEST RECEIVED:", req.method, req.url);
  next();
});

// Routes
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/wishlist", wishlistRoute);
app.use("/api/profile", profileRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/upload", uploadRoutes);
const PORT = process.env.PORT || 3000;

connectDB();

// Seed default categories if none exist (idempotent)
(async () => {
  try {
    const defaults = [
      { name: "Sofas", isActive: true },
      { name: "Chairs", isActive: true },
      { name: "Tables", isActive: true },
      { name: "Beds", isActive: true },
      { name: "Storage", isActive: true },
      { name: "Lighting", isActive: true },
      { name: "Decor", isActive: true },
    ];
    for (const c of defaults) {
      const exists = await Category.findOne({ name: c.name });
      if (!exists) await Category.create(c);
    }
  } catch (e) {
    console.error("Category seed failed:", e.message);
  }
})();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
