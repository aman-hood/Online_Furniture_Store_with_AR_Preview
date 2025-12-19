import React from "react";
import { Link } from "react-router-dom";

const BlogGrid = () => {
  const posts = [
    {
      slug: "modern-furniture-trends",
      title: "Modern Furniture Trends",
    },
    {
      slug: "small-home-design",
      title: "Small Home Design Tips",
    },
    {
      slug: "lighting-ideas",
      title: "Lighting Ideas for Living Room",
    },
  ];

  return (
    <div className="pt-28 px-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-semibold mb-8">Blog Grid</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {posts.map((p) => (
          <Link
            key={p.slug}
            to={`/blog/${p.slug}`}
            className="p-4 border rounded-lg hover:shadow"
          >
            <h2 className="font-medium">{p.title}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BlogGrid;
