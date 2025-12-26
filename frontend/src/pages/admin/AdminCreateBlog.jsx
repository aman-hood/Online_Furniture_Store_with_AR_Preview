import React, { useState } from "react";
import axios from "axios";

const AdminCreateBlog = () => {
  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    coverImage: "",
  });

  //  IMAGE UPLOAD HAPPENS HERE
  const uploadImage = async (file) => {
    const fd = new FormData();
    fd.append("image", file);

    const res = await axios.post(
      "http://localhost:3000/api/upload/blog/admin",
      fd,
      { withCredentials: true }
    );

    setForm((prev) => ({
      ...prev,
      coverImage: res.data.url, // 👈 IMAGE URL SAVED
    }));
  };

  // BLOG SAVE (WITH IMAGE URL)
  const submitBlog = async () => {
  try {
    await axios.post(
      "http://localhost:3000/api/blogs/admin",
      form,
      { withCredentials: true }
    );
    alert("Blog published successfully");
  } catch (err) {
    console.error(err);
    alert(err.response?.data?.message || "Failed to publish blog");
  }
};


  return (
    <div className="pt-28 max-w-3xl mx-auto space-y-4">
      <h1 className="text-3xl font-semibold">Create Blog</h1>

      <input
        placeholder="Title"
        className="border p-2 w-full"
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      <input
        placeholder="Slug"
        className="border p-2 w-full"
        onChange={(e) => setForm({ ...form, slug: e.target.value })}
      />

      <textarea
        placeholder="Excerpt"
        className="border p-2 w-full"
        onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
      />

      <textarea
        placeholder="Content"
        className="border p-2 w-full"
        onChange={(e) => setForm({ ...form, content: e.target.value })}
      />

      {/*  IMAGE INPUT */}
      <input
        type="file"
        accept="image/*"
        onChange={(e) => uploadImage(e.target.files[0])}
      />

      {/*  IMAGE PREVIEW */}
      {form.coverImage && (
        <img
          src={`http://localhost:3000${form.coverImage}`}
          className="h-40 rounded object-cover"
          alt="preview"
        />
      )}

      <button
        onClick={submitBlog}
        className="bg-black text-white px-4 py-2 rounded"
      >
        Publish Blog
      </button>
    </div>
  );
};

export default AdminCreateBlog;
