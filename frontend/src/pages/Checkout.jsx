import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  // fallback safety
  const amount = state?.amount || 0;
  const email = state?.email || "Not provided";
  const message = state?.message || "";

  // If user directly opens /checkout
  if (!state) {
    navigate("/gift-cards");
    return null;
  }

  return (
    <section className="min-h-screen bg-[#fbf9f6] flex items-center justify-center px-6 pt-30">

      <div className="max-w-lg w-full bg-white rounded-3xl shadow-[0_30px_80px_rgba(0,0,0,0.12)] p-10">

        {/* HEADER */}
        <div className="text-center mb-10">
          <p className="uppercase text-[11px] tracking-[0.35em] text-[#7a7166] mb-4">
            Secure Checkout
          </p>

          <h1 className="text-[28px] font-medium text-[#3f3a33] mb-3">
            Review Your Gift Card
          </h1>

          <p className="text-sm text-[#6b6258]">
            Please confirm your details before payment.
          </p>
        </div>

        {/* ORDER SUMMARY */}
        <div className="bg-[#f7f3ed] rounded-2xl p-6 mb-8 text-sm text-[#5f564c]">

          <div className="flex justify-between mb-3">
            <span>Gift Card Amount</span>
            <span>₹{amount.toLocaleString()}</span>
          </div>

          <div className="flex justify-between mb-3">
            <span>Delivery</span>
            <span>Free</span>
          </div>

          <div className="border-t border-[#e6dfd5] pt-4 flex justify-between font-medium text-[#3f3a33]">
            <span>Total</span>
            <span>₹{amount.toLocaleString()}</span>
          </div>
        </div>

        {/* RECIPIENT INFO */}
        <div className="mb-8 text-sm text-[#5f564c]">
          <p><strong>Email:</strong> {email}</p>
          {message && (
            <p className="mt-2 italic text-[#6b6258]">
              “{message}”
            </p>
          )}
        </div>

        {/* PAYMENT BUTTON */}
        <button
            className="
                w-full
                bg-[#3f3a33] text-white
                py-4 rounded-full
                text-sm font-medium tracking-wide
                hover:bg-[#2f2a25]
                transition
            "
            onClick={() => {
                setTimeout(() => {
                navigate("/gift-card/success", {
                    state: { amount, email, message },
                });
                }, 800);
            }}
            >
            Pay ₹{amount.toLocaleString()}
        </button>


        <p className="text-[11px] text-center text-[#8a8177] mt-6">
          Payments are encrypted and securely processed.
        </p>

      </div>

    </section>
  );
};

export default Checkout;
