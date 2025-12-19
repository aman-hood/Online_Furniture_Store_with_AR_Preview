import React from "react";
import { Link } from "react-router-dom";

const BlogList = () => {
  const posts = [
    {
      slug: "modern-furniture-trends",
      title: "Modern Furniture Trends",
      excerpt: "Explore the latest trends in modern furniture design.",
    },
    {
      slug: "small-home-design",
      title: "Small Home Design Tips",
      excerpt: "Smart ideas to design small homes beautifully.",
    },
  ];

  return (
    <div className="pt-28 px-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6">Latest Posts</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((p) => (
          <Link
            key={p.slug}
            to={`/blog/${p.slug}`}
            className="p-4 border rounded-lg hover:shadow"
          >
            <h2 className="text-xl font-medium">{p.title}</h2>
            <p className="text-gray-600 mt-2">{p.excerpt}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
