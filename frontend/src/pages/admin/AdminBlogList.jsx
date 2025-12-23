import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AdminBlogList = () => {
  const [blogs, setBlogs] = useState([]);

  const loadBlogs = async () => {
    const res = await axios.get(
      "http://localhost:3000/api/blogs/admin/all",
      { withCredentials: true }
    );
    setBlogs(res.data);
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  const publish = async (id) => {
    await axios.put(
      `http://localhost:3000/api/blogs/admin/${id}/publish`,
      {},
      { withCredentials: true }
    );
    loadBlogs();
  };

  const remove = async (id) => {
    await axios.delete(
      `http://localhost:3000/api/blogs/admin/${id}`,
      { withCredentials: true }
    );
    loadBlogs();
  };

  return (
    <div className="pt-28 max-w-6xl mx-auto px-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold">Admin Blogs</h1>

        {/* CREATE BLOG */}
        <Link
          to="/admin/blogs/new"
          className="bg-black text-white px-4 py-2 rounded"
        >
          + Create Blog
        </Link>
      </div>

      {/* TABLE */}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">Title</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {blogs.map((b) => (
            <tr key={b._id} className="border-t">
              <td className="p-2">{b.title}</td>
              <td className="capitalize">{b.status}</td>
              <td className="flex gap-2 p-2">
                {b.status !== "published" && (
                  <button
                    onClick={() => publish(b._id)}
                    className="bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Publish
                  </button>
                )}
                <button
                  onClick={() => remove(b._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminBlogList;
