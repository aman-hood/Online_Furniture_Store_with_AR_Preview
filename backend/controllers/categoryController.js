import { Category } from "../models/categoryModel.js";

export const listCategories = async (req, res) => {
  try {
    const onlyActive = req.query.active === "true";
    const q = onlyActive ? { isActive: true } : {};
    const categories = await Category.find(q).sort({ name: 1 });
    res.status(200).json({ success: true, categories });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ success: false, message: "Category not found" });
    res.status(200).json({ success: true, category });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const createCategory = async (req, res) => {
  try {
    const { name, description, isActive } = req.body;
    if (!name) return res.status(400).json({ success: false, message: "Name is required" });

    const exists = await Category.findOne({ name });
    if (exists) return res.status(409).json({ success: false, message: "Category already exists" });

    const category = await Category.create({ name, description, isActive });
    res.status(201).json({ success: true, category });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (name) {
      const duplicate = await Category.findOne({ name, _id: { $ne: req.params.id } });
      if (duplicate) return res.status(409).json({ success: false, message: "Category name already in use" });
    }
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!category) return res.status(404).json({ success: false, message: "Category not found" });
    res.status(200).json({ success: true, category });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ success: false, message: "Category not found" });
    res.status(200).json({ success: true, message: "Deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
