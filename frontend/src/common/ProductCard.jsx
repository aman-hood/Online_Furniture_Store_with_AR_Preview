import React, { useEffect, useState } from "react";
import { FiHeart } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
} from "../services/wishlistService";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  // 🔑 BACKEND PRODUCTS HAVE _id (Mongo ObjectId)
  const productId = product._id;
  const isBackendProduct = Boolean(productId);

  const [wishlisted, setWishlisted] = useState(false);
  const [loading, setLoading] = useState(false);

  /* -------------------------
     CHECK WISHLIST STATE
  ------------------------- */
  useEffect(() => {
    const checkWishlist = async () => {
      if (!isBackendProduct) return;

      try {
        const wl = await getWishlist();
        const exists = wl?.products?.some(
          (item) => item._id === productId
        );
        setWishlisted(Boolean(exists));
      } catch {
        setWishlisted(false);
      }
    };

    checkWishlist();
  }, [productId, isBackendProduct]);

  /* -------------------------
     TOGGLE WISHLIST
  ------------------------- */
  const toggleWishlist = async (e) => {
    e.stopPropagation();
    e.preventDefault();

    // ❌ BLOCK MOCK PRODUCTS
    if (!isBackendProduct || loading) return;

    try {
      setLoading(true);

      if (wishlisted) {
        await removeFromWishlist(productId);
        setWishlisted(false);
      } else {
        await addToWishlist(productId);
        setWishlisted(true);
      }
    } catch (err) {
      if (err?.response?.status === 401) {
        window.location.href = "/login";
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={() =>
        isBackendProduct && navigate(`/product/${productId}`)
      }
      className="
        cursor-pointer
        p-4
        rounded-2xl
        bg-white
        min-h-[320px]
        transition
        hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)]
      "
    >
      {/* IMAGE */}
      <div className="relative mb-4 bg-[#f4eee6] rounded-xl overflow-hidden">
        <img
          src={product.img}
          alt={product.name}
          className="
            w-full h-[220px] object-cover
            transition-transform duration-500
            hover:scale-105
          "
        />

        {/* ❤️ HEART ICON */}
        <button
          onClick={toggleWishlist}
          disabled={!isBackendProduct}
          aria-label="Add to wishlist"
          title={
            isBackendProduct
              ? "Add to wishlist"
              : "Wishlist available for real products only"
          }
          className={`
            absolute top-3 right-3
            p-2 rounded-full
            transition
            ${
              wishlisted
                ? "text-red-500  scale-110"
                : " text-[#3f3a33] hover:bg-[#f4eee6]"
            }
            ${!isBackendProduct ? "opacity-40 cursor-not-allowed" : ""}
          `}
        >
          <FiHeart
            size={18}
            className={wishlisted ? "fill-current" : ""}
          />
        </button>
      </div>

      {/* CONTENT */}
      <div>
        <p className="text-sm font-medium text-[#3f3a33] mb-1">
          {product.name}
        </p>

        <p className="text-sm text-[#6b6258]">
          ₹{product.price.toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
