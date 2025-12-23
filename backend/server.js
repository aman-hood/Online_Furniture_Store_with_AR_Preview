import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import http from "http";
import { Server } from "socket.io";

import connectDB from "./database/db.js";

// Routes
import userRoute from "./routes/userRoute.js";
import productRoute from "./routes/productRoute.js";
import cartRoute from "./routes/cartRoute.js";
import wishlistRoute from "./routes/wishlistRoute.js";
import profileRoute from "./routes/profileRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import newsletterRoute from "./routes/newsletterRoute.js";
import roomRoutes from "./routes/roomRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import adminContactRoutes from "./routes/adminContactRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import uploadBlogImageRoute from "./routes/uploadBlogImage.js";

// ===============================
// CREATE EXPRESS APP
// ===============================
const app = express();

// ===============================
// MIDDLEWARE
// ===============================
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// Debug logger
app.use((req, res, next) => {
  console.log("REQUEST:", req.method, req.url);
  next();
});

// Static images
app.use(
  "/images",
  express.static(path.join(process.cwd(), "public/images"))
);

// ===============================
// ROUTES
// ===============================
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/wishlist", wishlistRoute);
app.use("/api/profile", profileRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/upload", uploadRoutes);
app.use("/api/newsletter", newsletterRoute);
app.use("/api/rooms", roomRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/admin/contacts", adminContactRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/upload/blog", uploadBlogImageRoute);



// ===============================
// DATABASE
// ===============================
connectDB();

// ===============================
// HTTP SERVER + SOCKET.IO
// ===============================
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("🔌 Socket connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("❌ Socket disconnected:", socket.id);
  });
});

// 🔥 EXPORT IO FOR CONTROLLERS
export { io };

// ===============================
// START SERVER
// ===============================
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
