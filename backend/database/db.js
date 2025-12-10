<<<<<<< HEAD
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
  try {
    console.log("Connecting to:", process.env.MONGO_URI);

    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB Connection failed:", error.message);
  }
};

export default connectDB;
=======
import mongoose from 'mongoose';

const connectDB = async() =>{
    try{
        await mongoose.connect(`${process.env.MONGO_URI}/onlineFurnitureStore`)
        console.log('MongoDB connected Successfully');
    }catch(error){
        console.log("MongoDB Connection failed.", error);
    }
}

export default connectDB;
>>>>>>> 4fa3c16479dda62fa76b465898d6fe9199e53196
