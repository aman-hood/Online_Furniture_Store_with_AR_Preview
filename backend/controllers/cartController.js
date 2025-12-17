import { Cart } from "../models/cartModel.js";

const ensureCart = async (userId) => {
  let cart = await Cart.findOne({ user: userId }).populate({ path: "items.product" });
  if (!cart) cart = await Cart.create({ user: userId, items: [] });
  return cart;
};

const sameId = (a, b) => {
  const left = a && a._id ? a._id.toString() : a?.toString?.();
  return left === String(b);
};

export const getCart = async (req, res) => {
  try {
    const cart = await ensureCart(req.id);
    res.status(200).json({ success: true, cart });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    if (!productId) return res.status(400).json({ success: false, message: "productId required" });

    const cart = await ensureCart(req.id);
    const idx = cart.items.findIndex((i) => sameId(i.product, productId));
    if (idx >= 0) {
      cart.items[idx].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }
    await cart.save();
    await cart.populate({ path: "items.product" });
    res.status(200).json({ success: true, cart });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const cart = await ensureCart(req.id);
    cart.items = cart.items.filter((i) => !sameId(i.product, productId));
    await cart.save();
    await cart.populate({ path: "items.product" });
    res.status(200).json({ success: true, cart });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateCartItem = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    if (quantity <= 0) return res.status(400).json({ success: false, message: "quantity must be > 0" });
    const cart = await ensureCart(req.id);
    const item = cart.items.find((i) => sameId(i.product, productId));
    if (!item) return res.status(404).json({ success: false, message: "Item not in cart" });
    item.quantity = quantity;
    await cart.save();
    await cart.populate({ path: "items.product" });
    res.status(200).json({ success: true, cart });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const clearCart = async (req, res) => {
  try {
    const cart = await ensureCart(req.id);
    cart.items = [];
    await cart.save();
    res.status(200).json({ success: true, cart });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
