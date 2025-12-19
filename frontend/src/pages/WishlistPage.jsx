import React, { useEffect, useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import MasonryGrid from "../components/shop/MasonryGrid";
import { getWishlist, removeFromWishlist } from "../services/wishlistService";
import { addToCart } from "../services/cartService";
import { useApp } from "../context/AppContext";

export default function WishlistPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const { setWishlistCount, setCartCount } = useApp();

  useEffect(() => {
    const load = async () => {
      try {
        const wlItems = await getWishlist();
        setItems(wlItems || []);
        setWishlistCount(wlItems?.length || 0);
      } catch (err) {
        if (err?.response?.status === 401) {
          window.location.href = "/login";
        }
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const handleMoveAllToCart = async () => {
    for (const product of items) {
      await addToCart(product._id, 1);
      await removeFromWishlist(product._id);
    }

    setItems([]);
    setWishlistCount(0);
    setCartCount((prev) => prev + items.length);
  };

  return (
    <section className="min-h-screen pt-24 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl mb-6">My Wishlist</h1>

        {loading ? (
          <p>Loading…</p>
        ) : items.length === 0 ? (
          <div className="text-center py-32">
            <p>Your wishlist is empty</p>
            <Link to="/collections" className="underline">
              Browse collections
            </Link>
          </div>
        ) : (
          <>
            <button onClick={handleMoveAllToCart} className="mb-6">
              <FiShoppingCart /> Move all to cart
            </button>

            <MasonryGrid
              products={items.map((p) => ({
                ...p,
                initiallyLiked: true,
              }))}
            />
          </>
        )}
      </div>
    </section>
  );
}
