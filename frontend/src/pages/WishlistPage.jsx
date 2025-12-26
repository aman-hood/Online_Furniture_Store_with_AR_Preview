import React, { useEffect, useState } from "react";
import { FiShoppingCart, FiHeart } from "react-icons/fi";
import { Link } from "react-router-dom";
import MasonryGrid from "../components/shop/MasonryGrid";
import {
  getWishlist,
  removeFromWishlist,
  addToWishlist,
} from "../services/wishlistService";
import {
  addToCart,
  removeFromCart,
} from "../services/cartService";
import { useApp } from "../context/AppContext";
import toast from "react-hot-toast";

export default function WishlistPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const {
    setWishlistIds,
    setWishlistCount,
    setCartCount,
  } = useApp();

  /* ================= LOAD WISHLIST ================= */
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

  /* ================= MOVE ALL + UNDO ================= */
const handleMoveAllToCart = async () => {
  const previousItems = [...items];

  // 🚀 1. INSTANT UI UPDATE (no waiting)
  setItems([]);
  setWishlistIds([]);
  setWishlistCount(0);
  setCartCount((c) => c + previousItems.length);

 toast.custom(
  (t) => (
    <div
      className={`
        flex items-center gap-4
        px-5 py-4
        rounded-2xl
        bg-[#3f3a33] text-white
        shadow-[0_20px_60px_rgba(0,0,0,0.2)]
        transition-all
        ${t.visible ? "animate-fade-in-up" : "animate-fade-out-down"}
      `}
    >
      <span className="text-sm">
        Moved to cart
      </span>

      <button
        className="text-sm underline opacity-80 hover:opacity-100"
        onClick={() => {
          undoMove(previousItems, t.id);
        }}
      >
        Undo
      </button>
    </div>
  ),
  { id: "move-to-cart" }
);


  // ⚡ 2. RUN API CALLS IN PARALLEL
  try {
    await Promise.all(
      previousItems.map((p) =>
        Promise.all([
          addToCart(p._id, 1),
          removeFromWishlist(p._id),
        ])
      )
    );
  } catch (err) {
    console.error("Move failed", err);
  }
};

const undoMove = async (previousItems, toastId) => {
  // 🚀 1. INSTANT UI RESTORE
  setItems(previousItems);
  setWishlistIds(previousItems.map((p) => p._id));
  setWishlistCount(previousItems.length);
  setCartCount((c) => c - previousItems.length);

  toast.dismiss(toastId);

  // ⚡ 2. PARALLEL NETWORK UNDO
  try {
    await Promise.all(
      previousItems.map((p) =>
        Promise.all([
          removeFromCart(p._id),
          addToWishlist(p._id),
        ])
      )
    );
  } catch (err) {
    console.error("Undo failed", err);
  }
};

  return (
    <section className="min-h-screen pt-32 px-6 bg-[#fbf9f6]">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-12">
          <div>
            <h1 className="text-3xl font-medium text-[#3f3a33] pb-2">
              My Wishlist
            </h1>
            <p className="text-sm text-[#6b6258] mt-1">
              {items.length} saved item{items.length !== 1 && "s"}
            </p>
            
          </div>

          {items.length > 0 && (
            <button
              onClick={handleMoveAllToCart}
              className="
                flex items-center gap-2
                bg-[#3f3a33] text-white
                px-6 py-3 rounded-full
                transition
                active:scale-95
              "
            >
              <FiShoppingCart />
              Move all to cart
            </button>
          )}
        </div>

        {/* CONTENT */}
        {loading ? (
          <p className="text-center py-32 text-[#6b6258]">
            Loading your wishlist…
          </p>
        ) : items.length === 0 ? (
          <div className="text-center py-40">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#f0ece6] mb-6">
              <FiHeart className="text-2xl text-[#8a8177]" />
            </div>

            <h2 className="text-xl font-medium text-[#3f3a33] mb-2">
              Your wishlist is empty
            </h2>

            <p className="text-[#6b6258] mb-6">
              Save your favorite furniture pieces here.
            </p>

            <Link
              to="/collections"
              className="
                inline-block
                px-6 py-3 rounded-full
                border border-[#3f3a33]
                text-[#3f3a33]
                hover:bg-[#3f3a33] hover:text-white
                transition
              "
            >
              Browse collections
            </Link>
          </div>
        ) : (
          <MasonryGrid
            products={items.map((p) => ({
              ...p,
              initiallyLiked: true,
            }))}
          />
        )}
      </div>
    </section>
  );
}
