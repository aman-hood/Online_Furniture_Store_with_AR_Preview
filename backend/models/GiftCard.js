import mongoose from "mongoose";

const giftCardSchema = new mongoose.Schema(
  {
        user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    },
    code: { type: String, unique: true, required: true },
    amount: Number,
    balance: Number,
    email: String,
    message: String,
    isUsed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("GiftCard", giftCardSchema);

