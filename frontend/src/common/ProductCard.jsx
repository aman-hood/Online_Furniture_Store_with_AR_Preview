import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { addToWishlist, removeFromWishlist } from "../services/wishlistService";
import { useApp } from "../context/AppContext";

const ProductCard = ({ product }) => {
  const { wishlistIds = [], wishlistLoading, setWishlistIds, setWishlistCount } = useApp();

  // ✅ HOOK ORDER SAFE
  if (wishlistLoading) return null;

  const navigate = useNavigate();

  const productId = product._id;
  const liked = wishlistIds.includes(productId);

  const handleWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!productId) return;

    if (liked) {
      await removeFromWishlist(productId);
      setWishlistIds((ids) => ids.filter((id) => id !== productId));
      setWishlistCount((c) => Math.max(c - 1, 0));
    } else {
      await addToWishlist(productId);
      setWishlistIds((ids) => [...ids, productId]);
      setWishlistCount((c) => c + 1);
    }
  };

  return (
    <div
      onClick={() => navigate(`/products/${productId}`)}
      className="relative cursor-pointer bg-white rounded-xl"
    >
      <button onClick={handleWishlist} className="absolute top-3 right-3 z-10">
        {liked ? (
          <FaHeart className="text-red-500 scale-110" />
        ) : (
          <FiHeart className="text-gray-600 hover:text-black" />
        )}
      </button>

      {product.imageUrl && (
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-56 object-cover rounded-xl"
        />
      )}

      <p className="mt-2 font-medium">{product.name}</p>
      <p className="text-gray-600">₹{product.price}</p>
    </div>
  );
};

export default ProductCard;
