import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllBlogs } from "../../services/blogService";
import { useApp } from "../../context/AppContext";

const BlogGrid = () => {
  
  const [posts, setPosts] = useState([]);
  const { user, loadingUser } = useApp();
  console.log("BLOGGRID USER 👉", user);


  useEffect(() => {
    getAllBlogs().then(setPosts);
  }, []);

  return (
    <div className="pt-28 px-6 max-w-7xl mx-auto">
     <div className="flex justify-between mb-8">
  <h1 className="text-3xl font-semibold">Blogs</h1>

  {/* USER */}
  {user?.role === "user" && (
    <Link
      to="/blog/write"
      className="bg-black text-white px-4 py-2 rounded"
    >
      ✍ Write Blog
    </Link>
  )}

  {/* ADMIN */}
  {user?.role === "admin" && (
    <div className="flex gap-2">
      

      <Link
        to="/admin/blogs/new"
        className="bg-black text-white px-4 py-2 rounded"
      >
        ➕ Create Blog
      </Link>
    </div>
  )}
</div>


      <div className="grid md:grid-cols-3 gap-6">
        {posts.map((p) => (
          <Link key={p._id} to={`/blog/${p.slug}`} className="border p-4 rounded">
            {p.coverImage && (
              <img
                src={`http://localhost:3000${p.coverImage}`}
                alt={p.title}
                className="h-40 w-full object-cover rounded mb-3"
              />
            )}


            <h2 className="font-semibold">{p.title}</h2>
            <p className="text-sm text-gray-600">{p.excerpt}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BlogGrid;
