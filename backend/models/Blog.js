import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: String,
    slug: String,
    excerpt: String,
    content: String,
    coverImage: String, // 👈 IMAGE URL STORED HERE
    status: {
      type: String,
      enum: ["pending", "published"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Blog", blogSchema);
