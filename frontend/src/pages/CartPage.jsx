import React, { useEffect, useState } from "react";
import {
  getCart,
  removeFromCart,
  updateCartItem,
  clearCart,
} from "../services/cartService";
import { useApp } from "../context/AppContext";
import { useNavigate, Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";

export default function CartPage() {
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(true);

  const { setCartCount } = useApp();
  const navigate = useNavigate();

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

  const hasStockIssue =
    cart.items?.some((it) => it.quantity > it.product.stock) ?? false;

  return (
    <section className="min-h-screen pt-32 px-6 bg-[#fbf9f6]">
      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-3xl font-medium text-[#3f3a33]">
            My Cart
          </h1>
          <p className="text-sm text-[#6b6258] mt-1">
            {cart.items.length} item{cart.items.length !== 1 && "s"} in cart
          </p>
        </div>

        {loading ? (
          <p className="text-center py-32 text-[#6b6258]">
            Loading your cart…
          </p>
        ) : cart.items.length === 0 ? (
          <div className="text-center py-40">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#f0ece6] mb-6">
              <FiShoppingCart className="text-2xl text-[#8a8177]" />
            </div>

            <h2 className="text-xl font-medium text-[#3f3a33] mb-2">
              Your cart is empty
            </h2>

            <p className="text-[#6b6258] mb-6">
              Looks like you haven’t added anything yet.
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
          <>
            {/* ITEMS */}
            <div className="space-y-5">
              {cart.items.map((it) => (
                <div
                  key={it.product?._id}
                  className="
                    flex gap-5 p-5 bg-white rounded-2xl
                    shadow-[0_18px_45px_rgba(0,0,0,0.06)]
                  "
                >
                  <img
                    src={`http://localhost:3000${it.product?.img}`}
                    alt={it.product?.name}
                    className="w-28 h-28 object-cover rounded-xl"
                  />

                  <div className="flex-1">
                    <p className="font-medium text-[#3f3a33]">
                      {it.product?.name}
                    </p>
                    <p className="text-sm text-[#6b6258] mt-1">
                      ₹{it.product?.price}
                    </p>

                    <div className="mt-4 flex items-center gap-3">
                      <button
                        className="px-3 py-1 border rounded-lg"
                        onClick={() => {
                          if (it.quantity === 1) {
                            handleRemove(it.product._id);
                          } else {
                            handleQty(it.product._id, it.quantity - 1);
                          }
                        }}
                      >
                        −
                      </button>

                      <span className="min-w-[24px] text-center">
                        {it.quantity}
                      </span>

                      <button
                        className={`px-3 py-1 border rounded-lg ${
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
                        className="ml-4 text-sm text-red-500 hover:underline"
                        onClick={() => handleRemove(it.product._id)}
                      >
                        Remove
                      </button>
                    </div>

                    {it.quantity >= it.product.stock && (
                      <p className="text-xs text-red-500 mt-2">
                        Maximum stock reached
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* SUMMARY */}
            <div className="mt-10 p-6 bg-white rounded-2xl shadow-[0_18px_45px_rgba(0,0,0,0.06)]">
              <div className="flex justify-between items-center mb-4">
                <button
                  onClick={handleClear}
                  className="text-sm underline text-[#6b6258]"
                >
                  Clear cart
                </button>

                <div className="text-lg font-medium text-[#3f3a33]">
                  Total: ₹{total}
                </div>
              </div>

              {hasStockIssue && (
                <p className="text-sm text-red-600 mb-3">
                  Stock has changed. Please update quantities before checkout.
                </p>
              )}

              <button
  disabled={hasStockIssue}
  onClick={() =>
    navigate("/checkout", {
      state: {
        type: "cart",
        items: cart.items,
        total,
      },
    })
  }
  className={`
    w-full py-3 rounded-full text-white font-medium transition
    ${
      hasStockIssue
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-[#3f3a33] hover:opacity-90"
    }
  `}
>
  Proceed to Checkout
</button>

            </div>
          </>
        )}
      </div>
    </section>
  );
}
