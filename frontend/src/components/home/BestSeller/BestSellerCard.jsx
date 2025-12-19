import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../services/wishlistService";

const ProductCard = ({ product, initiallyLiked = false }) => {
  const [liked, setLiked] = useState(initiallyLiked);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

 const handleWishlist = async (e) => {
  e.preventDefault();
  e.stopPropagation();

  // 🔍 DEBUG LOGS — PUT THEM HERE
  console.log("Product object:", product);
  console.log("Product _id:", product?._id);

  if (!product?._id) {
    console.warn("❌ product._id is missing — wishlist blocked");
    return;
  }

  if (loading) return;

  setLoading(true);
  try {
    if (liked) {
      await removeFromWishlist(product._id);
      setLiked(false);
    } else {
      await addToWishlist(product._id);
      setLiked(true);
    }
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};
;

  return (
    <div className="group">

      {/* IMAGE AREA ONLY navigates */}
      <div
        onClick={() => navigate(`/products/${product._id}`)}
        className="relative cursor-pointer w-70 h-65 bg-white border border-gray-500 overflow-hidden"
      >
        {/* ❤️ Wishlist */}
        <button
          onClick={handleWishlist}
          className="absolute top-3 right-3 z-50"
        >
          {liked ? (
            <FaHeart size={18} className="text-red-500" />
          ) : (
            <FiHeart size={18} className="text-gray-700 hover:text-black" />
          )}
        </button>

        <img
          src={product.img}
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
