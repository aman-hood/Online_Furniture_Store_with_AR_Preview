
import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./database/db.js";
import userRoute from "./routes/userRoute.js";

const app = express();

// Middlewares
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

app.use(express.json());
app.use((req, res, next) => {
  console.log("REQUEST RECEIVED:", req.method, req.url);
  next();
});
// Routes
app.use("/api/users", userRoute);

// Start Server + DB
const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
    console.log(`Server is listening on port: ${PORT}`);
    await connectDB();
});

