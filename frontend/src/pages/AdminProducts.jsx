import React, { useEffect, useState } from "react";
import { listProducts, deleteProduct } from "../services/productService";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await listProducts({});
      setProducts(data);
    } catch (err) {
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    toast((t) => (
      <div className="space-y-3">
        <p className="text-sm">
          Are you sure you want to delete this product?
        </p>
        <div className="flex gap-2 justify-end">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-3 py-1 text-sm border rounded"
          >
            Cancel
          </button>
          <button
            onClick={async () => {
              toast.dismiss(t.id);
              const loading = toast.loading("Deleting product...");
              try {
                await deleteProduct(id);
                setProducts((p) => p.filter((x) => x._id !== id));
                toast.success("Product deleted", { id: loading });
              } catch {
                toast.error("Delete failed", { id: loading });
              }
            }}
            className="px-3 py-1 text-sm bg-red-600 text-white rounded"
          >
            Delete
          </button>
        </div>
      </div>
    ));
  };

  return (
    <div className="bg-[#fbf9f6] min-h-screen pt-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="uppercase tracking-widest text-xs text-gray-500">
              Admin Panel
            </p>
            <h2 className="text-3xl font-semibold text-[#1a1816]">
              Products
            </h2>
          </div>

          <button
            onClick={() => navigate("/admin/products/new")}
            className="bg-[#1a1816] text-white px-5 py-2 rounded-full hover:bg-black transition"
          >
            Add Product
          </button>
        </div>

        {/* CONTENT */}
        {loading ? (
          <p className="text-gray-500">Loading products…</p>
        ) : products.length === 0 ? (
          <p className="text-gray-500">No products found.</p>
        ) : (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="p-4 text-left">Name</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Stock</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr
                    key={p._id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="p-4 font-medium">{p.name}</td>
                    <td className="p-4 text-center text-gray-600">
                      {p.category}
                    </td>
                    <td className="p-4 text-center">₹{p.price}</td>
                    <td className="p-4 text-center">{p.stock}</td>
                    <td className="p-4 text-right space-x-3">
                      <Link
                        to={`/admin/products/${p._id}/edit`}
                        className="text-sm text-blue-600 hover:underline"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(p._id)}
                        className="text-sm text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProducts;
