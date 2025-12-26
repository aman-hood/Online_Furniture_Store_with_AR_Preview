import Product from "../models/productModel.js";
import { Category } from "../models/categoryModel.js";

export const listProducts = async (req, res) => {
  try {
    const { category, q, room } = req.query;
    const filter = {};

    if (req.query.active === "true") filter.isActive = true;
    if (room) filter.room = new RegExp(`^${room}$`, "i");
    if (category) filter.category = new RegExp(`^${category}$`, "i");
    if (q) filter.name = { $regex: q, $options: "i" };

    const products = await Product.find(filter).sort({ createdAt: -1 });

    const baseUrl = `${req.protocol}://${req.get("host")}`;

    const normalized = products.map((p) => ({
      ...p.toObject(),
      img: p.img ? `${baseUrl}${p.img}` : null,
      model: p.modelUrl ? `${baseUrl}${p.modelUrl}` : null,
    }));

    res.status(200).json({ success: true, products: normalized });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    const baseUrl = `${req.protocol}://${req.get("host")}`;

    const normalizedProduct = {
      ...product.toObject(),
      img: product.img ? `${baseUrl}${product.img}` : null,
      model: product.modelUrl ? `${baseUrl}${product.modelUrl}` : null,
    };

    res.status(200).json({ success: true, product: normalizedProduct });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};



export const createProduct = async (req, res) => {
  try {
    const { category } = req.body;

    if (category) {
      const cat = await Category.findOne({ name: category, isActive: true });
      if (!cat) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid or inactive category" });
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

    if (category) {
      const cat = await Category.findOne({ name: category, isActive: true });
      if (!cat) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid or inactive category" });
      }
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!product)
      return res.status(404).json({ success: false, message: "Product not found" });

    res.status(200).json({ success: true, product });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product)
      return res.status(404).json({ success: false, message: "Product not found" });

    res.status(200).json({ success: true, message: "Deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getBestSellers = async (req, res) => {
  try {
    const products = await Product.find({
      isBestSeller: true,
      isActive: true,
    }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, products });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
