import { useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import axios from "axios";

const UserCreateBlog = () => {
  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    coverImage: "", // 🔥 REQUIRED
  });
  const [content, setContent] = useState("");

  /* ================= IMAGE UPLOAD ================= */
  const uploadImage = async (file) => {
    const fd = new FormData();
    fd.append("image", file);

    const res = await axios.post(
      "http://localhost:3000/api/upload/blog",
      fd,
      { withCredentials: true }
    );

    setForm((prev) => ({
      ...prev,
      coverImage: res.data.url,
    }));
  };

  /* ================= SUBMIT BLOG ================= */
  const submit = async () => {
    await axios.post(
      "http://localhost:3000/api/blogs",
      {
        ...form,
        content,
      },
      { withCredentials: true }
    );

    alert("Blog submitted for review");
  };

  return (
    <div className="pt-28 max-w-4xl mx-auto px-6 space-y-4">
      <h1 className="text-3xl font-semibold">Write a Blog</h1>

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

      {/* 🔥 IMAGE INPUT */}
      <input
        type="file"
        accept="image/*"
        onChange={(e) => uploadImage(e.target.files[0])}
      />

      {/* 🔥 IMAGE PREVIEW */}
      {form.coverImage && (
        <img
          src={`http://localhost:3000${form.coverImage}`}
          alt="preview"
          className="h-40 rounded object-cover"
        />
      )}

      <MDEditor value={content} onChange={setContent} />

      <button
        onClick={submit}
        className="bg-black text-white px-6 py-2 rounded"
      >
        Submit for Review
      </button>
    </div>
  );
};

export default UserCreateBlog;
