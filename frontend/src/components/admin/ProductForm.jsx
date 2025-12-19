import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProductForm } from "../../hooks/useProductForm";
import { uploadToCloudinary } from "../../utils/cloudinaryUpload";

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    form,
    setForm,
    categories,
    loading,
    catsLoading,
    handleChange,
    submit,
  } = useProductForm(id, navigate);

  const [imgUploading, setImgUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  // ---------------------------
  // Image Upload Handler
  // ---------------------------
  const uploadImage = async (file) => {
  if (!file || !file.type.startsWith("image/")) {
    alert("Only image files allowed");
    return;
  }

  setImgUploading(true);

  try {
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch("http://localhost:3000/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Upload failed");
    }

    setForm((prev) => ({ ...prev, imageUrl: data.url }));
  } catch (err) {
    alert(err.message);
  } finally {
    setImgUploading(false);
  }
};


  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    uploadImage(e.dataTransfer.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submit();
      alert(id ? "Product updated" : "Product created");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EFECE7] to-[#E6E1DA] px-6 py-10">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-semibold text-[#1A1816]">
            {id ? "Edit Product" : "Create Product"}
          </h1>
          <p className="text-[#6B6258]">
            Design how this product appears in AR & storefront
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* LEFT — FORM */}
          <div className="bg-white/80 backdrop-blur rounded-3xl p-8 shadow-[0_20px_60px_rgba(0,0,0,0.06)]">
            <form onSubmit={handleSubmit} className="space-y-7">

              {/* Product Name */}
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Luxury Lounge Chair"
                className="w-full bg-[#F7F6F4] rounded-full px-5 py-3"
              />

              {/* Category */}
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full bg-[#F7F6F4] rounded-full px-5 py-3"
              >
                <option value="">Select category</option>
                {categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>

              {/* Price */}
              <input
                type="number"
                min="0"
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="Price (₹)"
                className="w-full bg-[#F7F6F4] rounded-full px-5 py-3"
              />

              {/* 🔥 AR READY TOGGLE */}
              <div className="flex items-center justify-between bg-[#F7F6F4] px-5 py-4 rounded-2xl">
                <div>
                  <p className="font-medium text-[#1A1816]">AR Ready Product</p>
                  <p className="text-sm text-[#6B6258]">
                    Enable augmented reality preview
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setForm((p) => ({ ...p, isARReady: !p.isARReady }))
                  }
                  className={`w-14 h-8 rounded-full transition ${
                    form.isARReady ? "bg-[#1A1816]" : "bg-[#CFC9C2]"
                  }`}
                >
                  <span
                    className={`block w-6 h-6 bg-white rounded-full transform transition ${
                      form.isARReady ? "translate-x-7" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              {/* 🖼️ DRAG & DROP IMAGE */}
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragActive(true);
                }}
                onDragLeave={() => setDragActive(false)}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-3xl p-8 text-center transition ${
                  dragActive
                    ? "border-[#1A1816] bg-[#F1EFEA]"
                    : "border-[#D8D3CC]"
                }`}
              >
                <p className="text-[#3F3A36] font-medium">
                  Drag & drop product image
                </p>
                <p className="text-sm text-[#6B6258] mt-1">
                  PNG / WebP recommended for AR
                </p>

                <label className="inline-block mt-4 cursor-pointer">
                  <span className="px-6 py-3 bg-[#1A1816] text-white rounded-full text-sm">
                    Browse Files
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => uploadImage(e.target.files[0])}
                    className="hidden"
                  />
                </label>

                {imgUploading && (
                  <p className="mt-3 text-sm text-[#6B6258]">
                    Uploading image…
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading || catsLoading || imgUploading}
                className="w-full mt-4 px-8 py-3 bg-[#1A1816] text-white rounded-full"
              >
                {loading ? "Saving…" : "Add Product"}
              </button>
            </form>
          </div>

          {/* RIGHT — LIVE PREVIEW */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
            {form.imageUrl ? (
              <img
                src={form.imageUrl}
                alt="Preview"
                className="w-full h-[420px] object-cover"
              />
            ) : (
              <div className="h-[420px] flex items-center justify-center text-[#9C948A]">
                Image Preview
              </div>
            )}

            <div className="p-6">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-medium">
                  {form.name || "Product Name"}
                </h2>

                {form.isARReady && (
                  <span className="px-3 py-1 text-xs rounded-full bg-[#1A1816] text-white">
                    AR READY
                  </span>
                )}
              </div>

              <p className="mt-2 text-[#6B6258]">
                ₹{form.price || "—"}
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductForm;
