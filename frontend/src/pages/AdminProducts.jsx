import React, { useEffect, useState } from "react";
import { listProducts, deleteProduct } from "../services/productService";
import { Link, useNavigate } from "react-router-dom";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetch = async () => {
    setLoading(true);
    try {
      const data = await listProducts({});
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this product?")) return;
    try {
      await deleteProduct(id);
      setProducts((p) => p.filter((x) => x._id !== id));
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  return (
    <div className="p-6 pt-30">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Admin — Products</h2>
        <div>
          <button
            onClick={() => navigate("/admin/products/new")}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Add Product
          </button>
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-auto">
          <table className="w-full table-auto border">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2">Name</th>
                <th className="p-2">Category</th>
                <th className="p-2">Price</th>
                <th className="p-2">Stock</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id} className="border-t">
                  <td className="p-2">{p.name}</td>
                  <td className="p-2">{p.category}</td>
                  <td className="p-2">{p.price}</td>
                  <td className="p-2">{p.stock}</td>
                  <td className="p-2">
                    <Link to={`/admin/products/${p._id}/edit`} className="mr-2 text-blue-600">Edit</Link>
                    <button onClick={() => handleDelete(p._id)} className="text-red-600">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
