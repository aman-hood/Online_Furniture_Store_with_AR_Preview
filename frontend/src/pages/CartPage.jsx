import React, { useEffect, useState } from "react";
import {
  getCart,
  removeFromCart,
  updateCartItem,
  clearCart,
} from "../services/cartService";
import { useApp } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(true);

  const { setCartCount } = useApp();
  const navigate = useNavigate();

  // 🔑 single source of truth
  const getCartItemCount = (data) =>
    data?.items?.reduce((sum, it) => sum + it.quantity, 0) ?? 0;

  const load = async () => {
    try {
      const c = await getCart();
      setCart(c || { items: [] });
      setCartCount(getCartItemCount(c));
    } catch (err) {
      if (err?.response?.status === 401) {
        window.location.href = "/login";
        return;
      }
      setCart({ items: [] });
      setCartCount(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  // 🔥 qty update (backend + UI sync)
  const handleQty = async (productId, qty) => {
    try {
      const updated = await updateCartItem(productId, qty);
      setCart(updated);
      setCartCount(getCartItemCount(updated));
    } catch (err) {
      if (err?.response?.status === 401) {
        window.location.href = "/login";
      }
    }
  };

  const handleRemove = async (productId) => {
    try {
      const updated = await removeFromCart(productId);
      setCart(updated);
      setCartCount(getCartItemCount(updated));
    } catch (err) {
      if (err?.response?.status === 401) {
        window.location.href = "/login";
      }
    }
  };

  const handleClear = async () => {
    try {
      const updated = await clearCart();
      setCart(updated);
      setCartCount(0);
    } catch (err) {
      if (err?.response?.status === 401) {
        window.location.href = "/login";
      }
    }
  };

  const total = (cart.items || []).reduce(
    (sum, it) => sum + (it.product?.price || 0) * it.quantity,
    0
  );

  // 🚨 STOCK CHECK (important)
  const hasStockIssue =
    cart.items?.some((it) => it.quantity > it.product.stock) ?? false;

  return (
    <div className="pt-32 px-6 mx-auto max-w-5xl">
      <h1 className="text-3xl font-semibold mb-6">My Cart</h1>

      {loading ? (
        <p>Loading...</p>
      ) : cart.items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <div className="space-y-5">
            {cart.items.map((it) => (
              <div
                key={it.product?._id}
                className="flex items-center gap-4 border p-4 rounded-xl bg-white"
              >
                <img
                  src={`http://localhost:3000${it.product?.img}`}
                  alt={it.product?.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />

                <div className="flex-1">
                  <p className="font-medium">{it.product?.name}</p>
                  <p className="text-sm text-gray-600">
                    ₹{it.product?.price}
                  </p>

                  <div className="mt-2 flex items-center gap-2">
                    {/* - */}
                    <button
                      className="px-2 border"
                      onClick={() => {
                        if (it.quantity === 1) {
                          handleRemove(it.product._id);
                        } else {
                          handleQty(it.product._id, it.quantity - 1);
                        }
                      }}
                    >
                      -
                    </button>

                    <span>{it.quantity}</span>

                    {/* + (stock-aware) */}
                    <button
                      className={`px-2 border ${
                        it.quantity >= it.product.stock
                          ? "opacity-40 cursor-not-allowed"
                          : ""
                      }`}
                      disabled={it.quantity >= it.product.stock}
                      onClick={() =>
                        handleQty(it.product._id, it.quantity + 1)
                      }
                    >
                      +
                    </button>

                    <button
                      className="ml-4 text-red-600"
                      onClick={() => handleRemove(it.product._id)}
                    >
                      Remove
                    </button>
                  </div>

                  {it.quantity >= it.product.stock && (
                    <p className="text-xs text-red-500 mt-1">
                      Max stock reached
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* FOOTER */}
          <div className="mt-8 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <button
                className="border px-4 py-2 rounded-lg"
                onClick={handleClear}
              >
                Clear Cart
              </button>

              <div className="text-xl font-semibold">
                Total: ₹{total}
              </div>
            </div>

            {/* 🚫 STOCK SAFE CHECKOUT */}
            {hasStockIssue && (
              <p className="text-sm text-red-600">
                Stock changed. Please update quantities before checkout.
              </p>
            )}

            <button
              disabled={hasStockIssue}
              onClick={() => navigate("/checkout")}
              className={`w-full py-3 rounded-lg text-white font-medium transition ${
                hasStockIssue
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-black hover:bg-gray-800"
              }`}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
