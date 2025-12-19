import { useEffect, useState } from "react";
import { createProduct, getProduct, updateProduct } from "../services/productService";
import { listCategories } from "../services/categoryService";

export const useProductForm = (id, navigate) => {
  const [loading, setLoading] = useState(false);
  const [catsLoading, setCatsLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: 0,
    category: "",
    imageUrl: "",
    stock: 0,
    isActive: true,
  });

  // Load categories
  useEffect(() => {
    const loadCategories = async () => {
      try {
        setCatsLoading(true);
        const cats = await listCategories({ active: true });
        setCategories(cats);
      } finally {
        setCatsLoading(false);
      }
    };
    loadCategories();
  }, []);

  // Load product if edit
  useEffect(() => {
    if (!id) return;

    const loadProduct = async () => {
      const p = await getProduct(id);
      setForm({
        name: p.name || "",
        description: p.description || "",
        price: p.price || 0,
        category: p.category?._id || "",
        imageUrl: p.imageUrl || "",
        stock: p.stock || 0,
        isActive: p.isActive ?? true,
      });
    };

    loadProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const submit = async () => {
    if (!form.name || !form.category || form.price <= 0) {
      throw new Error("Name, Category and valid Price required");
    }

    setLoading(true);

    const payload = {
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
    };

    try {
      if (id) {
        await updateProduct(id, payload);
      } else {
        await createProduct(payload);
      }
      navigate("/admin/products");
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    setForm,
    categories,
    loading,
    catsLoading,
    handleChange,
    submit,
  };
};
