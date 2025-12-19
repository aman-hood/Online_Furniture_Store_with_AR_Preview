import React, { useEffect, useState } from "react";
import { createProduct, getProduct, updateProduct } from "../../services/productService";
import { listCategories } from "../../services/categoryService";
import { useNavigate, useParams } from "react-router-dom";

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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

  useEffect(() => {
    (async () => {
      try {
        setCatsLoading(true);
        const cats = await listCategories({ active: true });
        setCategories(cats);
      } catch (e) {
        console.error(e);
      } finally {
        setCatsLoading(false);
      }
    })();
    if (!id) return;
    (async () => {
      try {
        const p = await getProduct(id);
        setForm({
          name: p.name || "",
          description: p.description || "",
          price: p.price || 0,
          category: p.category || "",
          imageUrl: p.imageUrl || "",
          stock: p.stock || 0,
          isActive: p.isActive ?? true,
        });
      } catch (err) {
        console.error(err);
        alert("Failed to load product");
      }
    })();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
      };
      if (id) {
        await updateProduct(id, payload);
        alert("Product updated");
      } else {
        await createProduct(payload);
        alert("Product created");
      }
      navigate("/admin/products");
    } catch (err) {
      console.error(err);
      const msg = err?.response?.data?.message || err?.message || "Save failed";
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl mb-4">{id ? "Edit Product" : "Add Product"}</h2>
      <form onSubmit={handleSubmit} className="space-y-3 max-w-lg">
        <div>
          <label className="block">Name</label>
          <input name="name" value={form.name} onChange={handleChange} className="w-full border p-2" required />
        </div>
        <div>
          <label className="block">Category</label>
          <select name="category" value={form.category} onChange={handleChange} className="w-full border p-2">
            <option value="">-- Select Category --</option>
            {categories.map((c) => (
              <option key={c._id} value={c.name}>{c.name}</option>
            ))}
          </select>
          {catsLoading && <p className="text-sm text-gray-500">Loading categories...</p>}
        </div>
        <div>
          <label className="block">Price</label>
          <input type="number" name="price" value={form.price} onChange={handleChange} className="w-full border p-2" required />
        </div>
        <div>
          <label className="block">Stock</label>
          <input type="number" name="stock" value={form.stock} onChange={handleChange} className="w-full border p-2" />
        </div>
        <div>
          <label className="block">Image URL</label>
          <input name="imageUrl" value={form.imageUrl} onChange={handleChange} className="w-full border p-2" />
        </div>
        <div>
          <label className="block">Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} className="w-full border p-2" />
        </div>
        <div className="flex items-center">
          <input type="checkbox" name="isActive" checked={form.isActive} onChange={handleChange} id="isActive" />
          <label htmlFor="isActive" className="ml-2">Active</label>
        </div>
        <div>
          <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded" disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;