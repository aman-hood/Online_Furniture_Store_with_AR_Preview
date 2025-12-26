import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { clearCart } from "../services/cartService";

const Checkout = () => {
  const navigate = useNavigate();
  const { setCartCount } = useApp();
  const { state } = useLocation();

  const [giftCode, setGiftCode] = useState("");
  const [giftUsed, setGiftUsed] = useState(0);

  useEffect(() => {
    if (!state) navigate("/", { replace: true });
  }, [state, navigate]);

  if (!state) return null;

  const isGiftCard = state.type === "gift";
  const isCart = state.type === "cart";

  const total = isGiftCard ? state.amount : state.total;
  const items = isCart ? state.items : [];

  const finalTotal = Math.max(total - giftUsed, 0);

  // 🎁 APPLY GIFT CARD
  const applyGiftCard = async () => {
    const res = await fetch("http://localhost:3000/api/giftcards/validate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: giftCode }),
    });

    const data = await res.json();

    if (data.valid) {
      setGiftUsed(Math.min(data.balance, total));
    } else {
      alert("Invalid gift card");
    }
  };

  // 💳 PAY
  const handlePayment = async () => {
    try {
      // 🎁 BUYING A GIFT CARD
      if (isGiftCard) {
        const res = await fetch("http://localhost:3000/api/giftcards", {
          method: "POST",
          credentials: "include", // 🔥 REQUIRED
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: state.amount,
            email: state.email,
            message: state.message,
          }),
        });

        if (!res.ok) throw new Error("Gift card creation failed");

        const data = await res.json();

        navigate("/gift-card/success", {
          replace: true,
          state: {
            amount: state.amount,
            email: state.email,
            message: state.message,
            code: data.code, // ✅ REAL CODE
          },
        });

        return;
      }

      // 🛒 CART CHECKOUT
      await fetch("http://localhost:3000/api/orders", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((it) => ({
            product: it.product._id,
            name: it.product.name,
            price: it.product.price,
            quantity: it.quantity,
            img: it.product.img,
          })),
          totalAmount: finalTotal,
          giftCode: giftUsed > 0 ? giftCode : null,
          giftUsed,
        }),
      });

      await clearCart();
      setCartCount(0);
      navigate("/order-success");
    } catch (err) {
      console.error("PAYMENT ERROR:", err);
      alert("Payment failed. Check console.");
    }
  };

  return (
    <section className="min-h-screen bg-[#fbf9f6] flex items-center justify-center px-6 pt-30">
      <div className="max-w-lg w-full bg-white rounded-3xl p-10 shadow-xl">

        {isCart && (
          <>
            <div className="mb-4">
              {items.map((it) => (
                <div key={it.product._id} className="flex justify-between text-sm">
                  <span>{it.product.name} × {it.quantity}</span>
                  <span>₹{it.product.price * it.quantity}</span>
                </div>
              ))}
            </div>

            {/* APPLY GIFT CARD */}
            <div className="bg-[#f7f3ed] p-4 rounded mb-4">
              <input
                value={giftCode}
                onChange={(e) => setGiftCode(e.target.value)}
                placeholder="Gift card code"
                className="border px-3 py-2 w-full mb-2"
              />
              <button
                onClick={applyGiftCard}
                className="bg-black text-white px-4 py-2 w-full rounded"
              >
                Apply Gift Card
              </button>

              {giftUsed > 0 && (
                <p className="text-green-700 mt-2">
                  Applied: -₹{giftUsed}
                </p>
              )}
            </div>
          </>
        )}

        <button
          onClick={handlePayment}
          className="w-full bg-black text-white py-4 rounded"
        >
          Pay ₹{finalTotal}
        </button>
      </div>
    </section>
  );
};

export default Checkout;
