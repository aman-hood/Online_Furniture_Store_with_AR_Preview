import { useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import axios from "axios";
import toast from "react-hot-toast";


const UserCreateBlog = () => {
  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    coverImage: "",
  });

  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);


  /* IMAGE UPLOAD */
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

  /* SUBMIT */
 const submit = async () => {
  // 1️⃣ VALIDATION FIRST
  if (!form.title || !form.slug || !content) {
    toast.error("Title, slug, and content are required");
    return;
  }

  if (submitting) return;

  let loadingToast;

  try {
    // 2️⃣ START SUBMIT
    setSubmitting(true);
    loadingToast = toast.loading("Submitting blog...");

    await axios.post(
      "http://localhost:3000/api/blogs",
      { ...form, content },
      { withCredentials: true }
    );

    // 3️⃣ SUCCESS
    toast.success("Blog submitted for review ✨", {
      id: loadingToast,
    });

    // 4️⃣ RESET FORM
    setForm({
      title: "",
      slug: "",
      excerpt: "",
      coverImage: "",
    });
    setContent("");

  } catch (err) {
    // 5️⃣ ERROR
    toast.error(
      err.response?.data?.message || "Failed to submit blog",
      { id: loadingToast }
    );
  } finally {
    // 6️⃣ CLEANUP
    setSubmitting(false);
  }
};



  return (
    <div className="bg-[#f3ece2]">
    <div className="pt-32 pb-20 max-w-3xl mx-auto px-6 ">
      {/* HEADER */}
      <div className="mb-10">
        <p className="uppercase tracking-widest text-sm text-gray-500">
          Author Panel
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-[#3f3a33] mt-2">
          Write a Story
        </h1>
        <p className="text-gray-600 mt-2 text-sm max-w-xl">
          Share insights, inspiration, or design stories that reflect your
          space and style.
        </p>
      </div>

      <div className="space-y-8">
        {/* TITLE */}
        <div>
          <label className="block text-sm mb-1 text-gray-600">
            Blog Title
          </label>
          <input
            value={form.title}
            placeholder="Minimal living room ideas"
            className="w-full border-b border-gray-300 focus:border-black outline-none py-3 text-lg bg-transparent"
            onChange={(e) =>
              setForm({
                ...form,
                title: e.target.value,
                slug: e.target.value
                  .toLowerCase()
                  .replace(/\s+/g, "-")
                  .replace(/[^a-z0-9-]/g, ""),
              })
            }
          />
        </div>

        {/* SLUG */}
        <div>
          <label className="block text-sm mb-1 text-gray-600">
            URL Slug
          </label>
          <input
            value={form.slug}
            className="w-full border-b border-gray-200 focus:border-black outline-none py-2 text-sm text-gray-500 bg-transparent"
            onChange={(e) =>
              setForm({ ...form, slug: e.target.value })
            }
          />
        </div>

        {/* EXCERPT */}
        <div>
          <label className="block text-sm mb-1 text-gray-600">
            Short Excerpt
          </label>
          <textarea
            value={form.excerpt}
            rows={3}
            placeholder="A short summary that appears on the blog listing..."
            className="w-full border border-gray-200 rounded-md p-3 text-sm focus:border-black outline-none"
            onChange={(e) =>
              setForm({ ...form, excerpt: e.target.value })
            }
          />
        </div>

        {/* IMAGE UPLOAD */}
        <div>
          <label className="block text-sm mb-2 text-gray-600">
            Cover Image
          </label>

          {!form.coverImage ? (
            <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg h-44 cursor-pointer hover:border-black transition">
              <span className="text-sm text-gray-500">
                Click to upload cover image
              </span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => uploadImage(e.target.files[0])}
              />
            </label>
          ) : (
            <div className="relative">
              <img
                src={`http://localhost:3000${form.coverImage}`}
                alt="cover"
                className="h-56 w-full object-cover rounded-lg"
              />
              <button
                onClick={() =>
                  setForm({ ...form, coverImage: "" })
                }
                className="absolute top-3 right-3 bg-black/70 text-white text-xs px-3 py-1 rounded"
              >
                Remove
              </button>
            </div>
          )}
        </div>

        {/* CONTENT */}
        <div>
          <label className="block text-sm mb-2 text-gray-600">
            Blog Content
          </label>
          <div data-color-mode="light">
            <MDEditor value={content} onChange={setContent} />
          </div>
        </div>

        {/* SUBMIT */}
        <div className="pt-6">
          <button
  disabled={submitting}
  onClick={submit}
  className={`px-10 py-3 rounded-full tracking-wide transition
    ${submitting
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-[#1a1816] hover:bg-black text-white"}
  `}
>
  {submitting ? "Submitting..." : "Submit for Review"}
</button>

        </div>
      </div>
    </div>
    </div>
  );
};

export default UserCreateBlog;
