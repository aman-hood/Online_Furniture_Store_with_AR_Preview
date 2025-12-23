import mongoose from "mongoose";

const replySchema = new mongoose.Schema(
  {
    message: String,
    repliedAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const contactSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    message: String,

    status: {
      type: String,
      enum: ["new", "replied"],
      default: "new",
    },

    replies: [replySchema],
  },
  { timestamps: true }
);

export default mongoose.model("Contact", contactSchema);
