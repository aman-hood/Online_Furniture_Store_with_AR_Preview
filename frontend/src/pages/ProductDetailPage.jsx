import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  FiHeart,
  FiBox,
  FiTruck,
  FiShield,
  FiRefreshCcw,
} from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import StarRating from "../common/StarRating";

import { addToCart as addToCartAPI } from "../services/cartService";
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} from "../services/wishlistService";

import {
  getReviews,
  addReview,
} from "../services/reviewService";

import { useApp } from "../context/AppContext";

const TABS = ["description", "specs", "care", "reviews"];

/* ---------------- REVIEW SECTION ---------------- */

const ReviewSection = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const loadReviews = async () => {
    const data = await getReviews(productId);
    setReviews(data);
  };

  useEffect(() => {
    loadReviews();
  }, [productId]);

  const handleSubmit = async () => {
    if (!comment.trim()) return;

    try {
      setSubmitting(true);
      await addReview({ productId, rating, comment });
      setComment("");
      setRating(5);
      loadReviews();
    } catch {
      alert("You must be logged in and can review only once.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* ADD REVIEW */}
      <div className="bg-white rounded-xl border p-6">
        <h3 className="font-semibold mb-3">Write a Review</h3>

        <StarRating rating={rating} setRating={setRating} editable />

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your experience"
          className="w-full border rounded-lg p-3 mt-3"
        />

        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="mt-4 bg-black text-white px-6 py-2 rounded hover:bg-gray-800 disabled:opacity-50"
        >
          Submit Review
        </button>
      </div>

      {/* REVIEW LIST */}
      {reviews.map((r) => (
        <div
          key={r._id}
          className="bg-white rounded-xl border p-5"
        >
          <div className="flex justify-between mb-1">
            <p className="font-medium">{r.name}</p>
            <span className="text-sm text-gray-500">
              {new Date(r.createdAt).toDateString()}
            </span>
          </div>

          <StarRating rating={r.rating} count={0} />

          <p className="mt-2 text-gray-700">{r.comment}</p>
        </div>
      ))}
    </div>
  );
};

/* ---------------- PRODUCT PAGE ---------------- */

const ProductDetailPage = () => {
  const { id } = useParams();
  const { setCartCount, setWishlistCount } = useApp();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("description");
  const [wishlisted, setWishlisted] = useState(false);

  /* FETCH PRODUCT */
  useEffect(() => {
    const load = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/products/${id}`,
          { withCredentials: true }
        );
        setProduct(res.data.product);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  /* FETCH WISHLIST STATE */
  useEffect(() => {
    const loadWishlist = async () => {
      try {
        const items = await getWishlist();
        setWishlisted(items.some((p) => p._id === id));
        setWishlistCount(items.length);
      } catch {}
    };
    loadWishlist();
  }, [id, setWishlistCount]);

  /* ADD TO CART */
  const handleAddToCart = async () => {
    if (product.stock === 0) return;

    try {
      const updatedCart = await addToCartAPI(product._id, 1);
      const count =
        updatedCart.items?.reduce((sum, it) => sum + it.quantity, 0) ?? 0;
      setCartCount(count);
    } catch {
      alert("Login required or stock limit reached");
    }
  };

  /* WISHLIST */
  const handleWishlist = async () => {
    try {
      if (wishlisted) {
        const wl = await removeFromWishlist(product._id);
        setWishlisted(false);
        setWishlistCount(wl.items.length);
      } else {
        const wl = await addToWishlist(product._id);
        setWishlisted(true);
        setWishlistCount(wl.items.length);
      }
    } catch {
      alert("Login required");
    }
  };

  if (loading) return <div className="pt-40 text-center">Loading…</div>;
  if (!product) return <div className="pt-40 text-center">Product not found</div>;

  return (
    <div className="bg-[#f6f4ef] min-h-screen pt-32 px-6">
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
          <h1 className="text-4xl font-semibold">{product.name}</h1>

          <StarRating
            rating={product.rating}
            count={product.reviewCount}
          />

          <p className="text-3xl font-medium">
            ₹{product.price.toLocaleString()}
          </p>

          {/* ONLY X LEFT */}
          {product.stock > 0 && product.stock <= 5 && (
            <div className="inline-flex px-3 py-1 rounded-full bg-red-50 text-red-600 text-sm font-medium animate-pulse">
              Only {product.stock} left in stock
            </div>
          )}

          {product.stock === 0 && (
            <p className="text-red-600 font-medium">Out of stock</p>
          )}

          {/* ACTIONS */}
          <div className="flex gap-4 pt-4">
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`px-10 py-4 rounded-full transition ${
                product.stock === 0
                  ? "bg-gray-400 cursor-not-allowed text-white"
                  : "bg-black text-white hover:bg-gray-800"
              }`}
            >
              {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
            </button>

            <button
              onClick={handleWishlist}
              className="p-4 rounded-full border hover:bg-gray-100"
            >
              {wishlisted ? (
                <FaHeart className="text-red-500" />
              ) : (
                <FiHeart />
              )}
            </button>
          </div>

          {/* TRUST */}
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-700 pt-6">
            <div className="flex items-center gap-2"><FiBox /> Premium Build</div>
            <div className="flex items-center gap-2"><FiTruck /> Free Delivery</div>
            <div className="flex items-center gap-2"><FiShield /> {product.warranty}</div>
            <div className="flex items-center gap-2"><FiRefreshCcw /> Easy Returns</div>
          </div>
        </div>
      </div>

      {/* TABS */}
      <div className="max-w-7xl mx-auto mt-24">
        <div className="border-b flex gap-10 text-sm font-medium">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 capitalize ${
                activeTab === tab
                  ? "border-b-2 border-black"
                  : "text-gray-500"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="mt-8 max-w-3xl text-gray-600">
          {activeTab === "description" && <p>{product.description}</p>}

          {activeTab === "specs" && (
            <ul className="space-y-2">
              <li><b>Material:</b> {product.material}</li>
              <li>
                <b>Dimensions:</b>{" "}
                {product.dimensions?.width} ×{" "}
                {product.dimensions?.height} ×{" "}
                {product.dimensions?.depth}
              </li>
            </ul>
          )}

          {activeTab === "care" && (
            <p>Clean with dry cloth. Covered under {product.warranty}.</p>
          )}

          {activeTab === "reviews" && (
            <ReviewSection productId={product._id} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
