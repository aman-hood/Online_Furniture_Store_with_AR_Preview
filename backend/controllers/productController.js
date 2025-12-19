import { Product } from "../models/productModel.js";
import { Category } from "../models/categoryModel.js";

export const listProducts = async (req, res) => {
  try {
    const { category, q } = req.query;
    const filter = {};

    // OPTIONAL active filter
    if (req.query.active === "true") {
      filter.isActive = true;
    }

    // Category (case-insensitive)
    if (category) {
      filter.category = new RegExp(`^${category}$`, "i");
    }

    // Search
    if (q) {
      filter.name = { $regex: q, $options: "i" };
    }

    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.status(200).json({ success: true, products });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });
    res.status(200).json({ success: true, product });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { category } = req.body;
    if (category && category.trim().length > 0) {
      const cat = await Category.findOne({ name: category, isActive: true });
      if (!cat) {
        return res.status(400).json({ success: false, message: "Invalid or inactive category" });
      }
    }
    const product = await Product.create(req.body);
    res.status(201).json({ success: true, product });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { category } = req.body;
    if (category && category.trim().length > 0) {
      const cat = await Category.findOne({ name: category, isActive: true });
      if (!cat) {
        return res.status(400).json({ success: false, message: "Invalid or inactive category" });
      }
    }
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });
    res.status(200).json({ success: true, product });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });
    res.status(200).json({ success: true, message: "Deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
