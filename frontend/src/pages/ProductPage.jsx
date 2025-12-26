import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  FiHeart,
  FiTruck,
  FiShield,
  FiRefreshCcw,
} from "react-icons/fi";
import { FaHeart } from "react-icons/fa";

import { getProduct } from "../services/productService";
import { addToCart } from "../services/cartService";
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} from "../services/wishlistService";

import StarRating from "../common/StarRating";
import ReviewSection from "./ReviewSection";
import ARViewer from "../components/ARViewer";
import { useApp } from "../context/AppContext";

const TABS = ["description", "specs", "warranty", "reviews"];

const ProductPage = () => {
  const { id } = useParams();
  const { setCartCount, setWishlistCount } = useApp();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [activeTab, setActiveTab] = useState("description");
  const [wishlisted, setWishlisted] = useState(false);
  const [showAR, setShowAR] = useState(false);

  /* LOAD PRODUCT */
  useEffect(() => {
    const load = async () => {
      try {
        const data = await getProduct(id);
        setProduct(data);
      } catch {
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  /* LOAD WISHLIST STATE */
  useEffect(() => {
    const loadWishlist = async () => {
      try {
        const items = await getWishlist();
        setWishlisted(
          items.some((p) => p._id === id || p.product?._id === id)
        );
        setWishlistCount(items.length);
      } catch {}
    };
    loadWishlist();
  }, [id, setWishlistCount]);

  if (loading) {
    return <div className="pt-40 text-center text-gray-500">Loading…</div>;
  }

  if (!product) {
    return <div className="pt-40 text-center">Product not found.</div>;
  }

  return (
    <div className="bg-[#f6f4ef] min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">

        {/* ================= HERO ================= */}
        <div className="grid md:grid-cols-2 gap-20">

          {/* IMAGE */}
          <div className="bg-white rounded-3xl p-14 flex items-center justify-center shadow-sm">
            <img
              src={product.img}
              alt={product.name}
              className="max-h-[420px] object-contain"
            />
          </div>

          {/* INFO */}
          <div className="space-y-6">
            <h1 className="text-4xl font-semibold">{product.name}</h1>

            <StarRating rating={product.rating} count={product.reviewCount} />

            <p className="text-3xl font-medium">₹{product.price}</p>

            <p
              className={`text-sm font-medium ${
                product.stock > 0 ? "text-green-600" : "text-red-500"
              }`}
            >
              {product.stock > 0
                ? `In stock (${product.stock})`
                : "Out of stock"}
            </p>

            {/* ACTION BUTTONS */}
            <div className="flex flex-wrap items-center gap-4 pt-4">

              {/* ADD TO CART */}
              <button
                disabled={adding || product.stock === 0}
                onClick={async () => {
                  try {
                    setAdding(true);
                    await addToCart(product._id, 1);
                    setCartCount((c) => c + 1);
                    toast.success("Added to cart");
                  } catch {
                    toast.error("Please login to add items");
                  } finally {
                    setAdding(false);
                  }
                }}
                className={`
                  px-10 py-4 rounded-full
                  text-white transition-all shadow-md
                  active:scale-[0.98]
                  ${
                    product.stock === 0
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-slate-900 hover:bg-slate-800"
                  }
                `}
              >
                {adding ? "Adding…" : "Add to Cart"}
              </button>

              {/* VIEW IN AR */}
              {product.model && (
                <button
                  onClick={() => setShowAR(true)}
                  className="
                    px-8 py-4 rounded-full border
                    bg-white hover:bg-gray-100
                    transition shadow-sm
                  "
                >
                  View in AR
                </button>
              )}

              {/* WISHLIST */}
              <button
                onClick={async () => {
                  try {
                    if (wishlisted) {
                      await removeFromWishlist(product._id);
                      setWishlisted(false);
                      setWishlistCount((c) => c - 1);
                      toast("Removed from wishlist");
                    } else {
                      await addToWishlist(product._id);
                      setWishlisted(true);
                      setWishlistCount((c) => c + 1);
                      toast.success("Saved to wishlist");
                    }
                  } catch {
                    toast.error("Please login first");
                  }
                }}
                className="
                  p-4 rounded-full border
                  hover:bg-rose-50 transition
                  active:scale-95
                "
              >
                {wishlisted ? (
                  <FaHeart className="text-rose-500 scale-110" />
                ) : (
                  <FiHeart className="text-gray-600" />
                )}
              </button>
            </div>

            {/* FEATURES */}
            <div className="grid grid-cols-2 gap-4 pt-6 text-sm text-gray-600">
              <div className="flex items-center gap-2"><FiTruck /> Free Delivery</div>
              <div className="flex items-center gap-2"><FiShield /> Warranty</div>
              <div className="flex items-center gap-2"><FiRefreshCcw /> Easy Returns</div>
            </div>
          </div>
        </div>

        {/* ================= TABS ================= */}
        <div className="mt-28">
          <div className="flex gap-12 border-b">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 capitalize font-medium transition ${
                  activeTab === tab
                    ? "border-b-2 border-slate-900 text-slate-900"
                    : "text-gray-500 hover:text-slate-900"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="mt-10 max-w-3xl">
            {activeTab === "description" && (
              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
            )}

            {activeTab === "specs" && (
              <div className="space-y-4 text-gray-700">
                <Spec label="Category" value={product.category} />
                <Spec label="Room" value={product.room} />
                <Spec label="Material" value={product.material} />
                <Spec
                  label="Dimensions"
                  value={`${product.dimensions?.width} × ${product.dimensions?.height} × ${product.dimensions?.depth}`}
                />
                <Spec label="Stock" value={`${product.stock} units`} />
              </div>
            )}

            {activeTab === "warranty" && (
              <div className="text-gray-700">
                <p className="font-medium mb-2">Warranty</p>
                <p>{product.warranty}</p>
              </div>
            )}

            {activeTab === "reviews" && (
              <ReviewSection productId={product._id} />
            )}
          </div>
        </div>
      </div>

      {/* AR VIEWER */}
      {showAR && product.model && (
        <ARViewer
          modelUrl={product.model}
          onClose={() => setShowAR(false)}
        />
      )}
    </div>
  );
};

/* ================= HELPER ================= */
const Spec = ({ label, value }) => (
  <div className="flex justify-between border-b pb-2">
    <span className="font-medium capitalize">{label}</span>
    <span className="capitalize text-gray-600">{value}</span>
  </div>
);

export default ProductPage;
