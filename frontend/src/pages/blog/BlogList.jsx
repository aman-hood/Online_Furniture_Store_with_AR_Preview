import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllBlogs } from "../../services/blogService";

const BlogList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const loadBlogs = async () => {
      const data = await getAllBlogs();
      setPosts(data);
    };
    loadBlogs();
  }, []);

  return (
    <div className="pt-28 px-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6">Latest Posts</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((p) => (
  <Link
    key={p._id}
    to={`/blog/${p.slug}`}
    className="p-4 border rounded-lg hover:shadow transition"
  >
    {/* 🔥 BLOG IMAGE */}
    {p.coverImage && (
      <img
        src={`http://localhost:3000${p.coverImage}`}
        alt={p.title}
        className="h-40 w-full object-cover rounded mb-3"
      />
    )}

    <h2 className="text-xl font-medium">{p.title}</h2>
    <p className="text-gray-600 mt-2">{p.excerpt}</p>
  </Link>
))}

      </div>
    </div>
  );
};

export default BlogList;
