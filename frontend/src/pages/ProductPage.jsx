import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProduct } from "../services/productService";
import { addToCart } from "../services/cartService";

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getProduct(id);
        setProduct(data);
      } catch (e) {
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="pt-28 px-6 max-w-6xl mx-auto">
        <p>Loading...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-28 px-6 max-w-6xl mx-auto">
        <p>Product not found.</p>
      </div>
    );
  }

  return (
    <div className="pt-28 px-6 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full rounded-xl object-cover"
          />
        </div>
        <div>
          <h1 className="text-3xl font-semibold mb-2">{product.name}</h1>
          <p className="text-xl font-bold mb-4">₹{product.price}</p>
          <p className="text-gray-700 mb-6">{product.description}</p>

          <div className="flex items-center gap-4">
            <button
              type="button"
              className="px-5 py-3 bg-black text-white rounded-lg disabled:opacity-60"
              disabled={adding}
              onClick={async () => {
                if (!product?._id) return;
                setAdding(true);
                try {
                  await addToCart(product._id, 1);
                  navigate("/cart");
                } catch (err) {
                  const status = err?.response?.status;
                  if (status === 401) {
                    navigate("/login");
                  }
                } finally {
                  setAdding(false);
                }
              }}
            >
              {adding ? "Adding..." : "Add to Cart"}
            </button>
            <span className="text-gray-500">Stock: {product.stock}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
