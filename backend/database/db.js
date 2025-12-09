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