import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBlogBySlug } from "../../services/blogService";
import ReactMarkdown from "react-markdown";

const BlogDetails = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const loadBlog = async () => {
      const data = await getBlogBySlug(slug);
      setBlog(data);
    };
    loadBlog();
  }, [slug]);

  if (!blog) return <p className="pt-28 text-center">Loading...</p>;

  return (
  <div className="pt-28 max-w-4xl mx-auto px-6">

    {/* 🔥 BLOG IMAGE */}
    {blog.coverImage && (
      <img
        src={`http://localhost:3000${blog.coverImage}`}
        alt={blog.title}
        className="w-full h-72 object-cover rounded mb-6"
      />
    )}

    <h1 className="text-4xl font-semibold">{blog.title}</h1>
    <p className="text-gray-600 mt-4">{blog.excerpt}</p>

    <div className="prose max-w-none mt-6">
      <ReactMarkdown>{blog.content}</ReactMarkdown>
    </div>
  </div>
);

};

export default BlogDetails;
