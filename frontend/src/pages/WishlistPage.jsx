import React, { useEffect, useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { FiShoppingCart } from "react-icons/fi";
import { getWishlist, removeFromWishlist } from "../services/wishlistService";
import { addToCart } from "../services/cartService";

export default function WishlistPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const wl = await getWishlist();
      setItems(wl.items || []);
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleRemove = async (productId) => {
    await removeFromWishlist(productId);
    load();
  };

  const handleMoveToCart = async (productId) => {
    await addToCart(productId, 1);
    await removeFromWishlist(productId);
    load();
  };

  return (
    <div className="pt-28 px-6  mx-auto">

      {/* Title */}
      <h1 className="text-4xl font-semibold mb-10 tracking-wide">My Wishlist</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {items.map((product) => (
            <div
              key={product._id}
              className="group border rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition-all"
            >
              {/* Image */}
              <div className="w-full h-64 relative overflow-hidden">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                />

                {/* Remove Icon */}
                <button
                  onClick={() => handleRemove(product._id)}
                  className="absolute top-3 right-3 bg-white/80 p-2 rounded-full shadow hover:bg-white transition"
                >
                  <FiTrash2 size={18} className="text-black" />
                </button>
              </div>

              {/* Text */}
              <div className="p-5">
                <p className="text-gray-600 text-sm">{product.name}</p>
                <p className="font-semibold text-lg text-black">₹{product.price}</p>

                {/* Move to Cart */}
                <button
                  onClick={() => handleMoveToCart(product._id)}
                  className="
                    mt-4 w-full py-2 rounded-lg 
                    border border-black text-black
                    hover:bg-black hover:text-white
                    transition
                    flex items-center justify-center gap-2
                  "
                >
                  <FiShoppingCart size={18} />
                  Move to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
