import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { FiHeart, FiBox, FiTruck, FiShield, FiRefreshCcw } from "react-icons/fi";
import StarRating from "../common/StarRating";




const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/products/${id}`
        );

        // ✅ FIX: use correct response shape
        setProduct(res.data.product);
      } catch (err) {
        console.error("PRODUCT LOAD ERROR:", err);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  if (loading) {
    return <div className="pt-40 text-center">Loading…</div>;
  }

  if (!product) {
    return <div className="pt-40 text-center">Product not found</div>;
  }

  return (
    <div className="bg-[#f6f4ef] min-h-screen pt-32 px-6">
      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20">

        {/* IMAGE */}
        <div className="bg-white rounded-[32px] p-14 flex items-center justify-center shadow-sm">
          <img
            src={`http://localhost:3000${product.img}`}
            alt={product.name}
            className="max-h-[520px] object-contain"
          />
        </div>

        {/* DETAILS */}
        <div className="space-y-6">
          <h1 className="text-4xl font-semibold text-[#1a1816] leading-tight">
            {product.name}
          </h1>

          {/* ⭐ RATING */}
          <StarRating rating={product.rating || 4.6} count={product.reviewCount || 128} />

          <p className="text-3xl font-medium text-[#1a1816]">
            ₹{product.price.toLocaleString()}
          </p>

          <p className="text-gray-600 leading-relaxed max-w-md">
            Crafted using premium materials and refined finishes,
            this piece brings timeless elegance to modern interiors.
          </p>

          {/* HIGHLIGHTS */}
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-700 pt-4">
            <div className="flex items-center gap-2">
              <FiBox /> Solid Wood Frame
            </div>
            <div className="flex items-center gap-2">
              <FiTruck /> Free Delivery
            </div>
            <div className="flex items-center gap-2">
              <FiShield /> 2 Year Warranty
            </div>
            <div className="flex items-center gap-2">
              <FiRefreshCcw /> Easy Returns
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex gap-4 pt-6">
            <button className="px-10 py-4 bg-black text-white rounded-full hover:bg-gray-800 transition">
              Add to Cart
            </button>

            <button className="p-4 rounded-full border hover:bg-gray-100 transition">
              <FiHeart size={20} />
            </button>
          </div>

          {/* AR */}
          <button className="underline text-sm text-gray-700 hover:text-black">
            View in your space (AR)
          </button>
        </div>
      </div>

      {/* TABS */}
      <div className="max-w-7xl mx-auto mt-24">
        <div className="border-b flex gap-10 text-sm font-medium">
          <button className="pb-4 border-b-2 border-black">
            Description
          </button>
          <button className="pb-4 text-gray-500">Specifications</button>
          <button className="pb-4 text-gray-500">Care & Warranty</button>
          <button className="pb-4 text-gray-500">Reviews</button>
        </div>

        <div className="mt-8 max-w-3xl text-gray-600 leading-relaxed">
          <p>
            Designed for durability and comfort, this product is
            handcrafted by skilled artisans using responsibly
            sourced materials. Each piece undergoes rigorous
            quality checks to ensure long-lasting performance.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;