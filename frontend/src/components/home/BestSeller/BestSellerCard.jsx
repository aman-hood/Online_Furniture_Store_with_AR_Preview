import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../services/wishlistService";
import { useApp } from "../../../context/AppContext";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const {
    wishlistIds = [],
    setWishlistIds,
    setWishlistCount,
  } = useApp();

  const [loading, setLoading] = useState(false);

  // ✅ SINGLE SOURCE OF TRUTH
  const liked = wishlistIds.includes(product._id);

  const handleWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!product?._id || loading) return;
    setLoading(true);

    try {
      if (liked) {
        await removeFromWishlist(product._id);
        setWishlistIds((ids) => ids.filter((id) => id !== product._id));
        setWishlistCount((c) => Math.max(c - 1, 0));
      } else {
        await addToWishlist(product._id);
        setWishlistIds((ids) => [...ids, product._id]);
        setWishlistCount((c) => c + 1);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="group">
      <div
        onClick={() => navigate(`/products/${product._id}`)}
        className="relative cursor-pointer w-70 h-65 bg-white border overflow-hidden"
      >
        {/* ❤️ Wishlist */}
        <button
          onClick={handleWishlist}
          disabled={loading}
          className="absolute top-3 right-3 z-50"
        >
          {liked ? (
            <FaHeart size={18} className="text-red-500" />
          ) : (
            <FiHeart size={18} className="text-gray-700 hover:text-black" />
          )}
        </button>

        <img
          src={product.imageUrl || null}
          alt={product.name}
          className="w-full h-full object-cover pointer-events-none"
        />
      </div>

      <p className="text-gray-600 text-sm mt-3">{product.name}</p>
      <p className="font-semibold">₹{product.price}</p>
    </div>
  );
};

export default ProductCard;
