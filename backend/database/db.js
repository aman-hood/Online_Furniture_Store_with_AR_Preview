import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    console.log("Connecting to:", uri);  // Debug line

    await mongoose.connect(`${uri}/onlineFurnitureStore`);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB Connection failed:", error.message);
  }
};

export default connectDB;
