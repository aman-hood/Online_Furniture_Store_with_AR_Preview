import { Wishlist } from "../models/wishlistModel.js";

const ensureWishlist = async (userId) => {
  let wl = await Wishlist.findOne({ user: userId }).populate("items");
  if (!wl) wl = await Wishlist.create({ user: userId, items: [] });
  return wl;
};

export const getWishlist = async (req, res) => {
  try {
    const wl = await ensureWishlist(req.id);
    res.status(200).json({ success: true, wishlist: wl });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    if (!productId) return res.status(400).json({ success: false, message: "productId required" });
    const wl = await ensureWishlist(req.id);
    if (!wl.items.find((id) => id.toString() === productId)) wl.items.push(productId);
    await wl.save();
    await wl.populate("items");
    res.status(200).json({ success: true, wishlist: wl });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const wl = await ensureWishlist(req.id);
    wl.items = wl.items.filter((id) => id.toString() !== productId);
    await wl.save();
    await wl.populate("items");
    res.status(200).json({ success: true, wishlist: wl });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
