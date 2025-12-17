import React from "react";
import { useParams } from "react-router-dom";

const BlogPost = () => {
  const { slug } = useParams();

  return (
    <div className="pt-28 px-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-semibold mb-4">Blog Post</h1>
      <p className="text-gray-600 mb-6">Slug: {slug}</p>
      <div className="prose max-w-none">
        <p>Content coming soon.</p>
      </div>
    </div>
  );
};

export default BlogPost;
