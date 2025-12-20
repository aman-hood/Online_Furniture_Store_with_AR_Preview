import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiCheckCircle } from "react-icons/fi";

const GiftCardSuccess = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  // fallback (if someone refreshes page)
  const amount = state?.amount || 0;
  const email = state?.email || "recipient email";
  const message = state?.message || "";

  return (
    <section className="bg-[#fbf9f6] min-h-screen flex items-center justify-center px-6 pt-30">
      <div className="max-w-xl w-full bg-white rounded-3xl p-10 text-center shadow-[0_30px_70px_rgba(0,0,0,0.12)]">

        {/* ICON */}
        <div className="flex justify-center mb-6">
          <div className="bg-[#e9f4ee] text-[#3f3a33] p-4 rounded-full">
            <FiCheckCircle size={42} />
          </div>
        </div>

        {/* TITLE */}
        <h1 className="text-[26px] font-medium text-[#3f3a33] mb-3">
          Gift Card Sent Successfully
        </h1>

        <p className="text-[#6b6258] text-[15px] leading-relaxed mb-8">
          Your payment was successful. The gift card has been sent
          digitally and will reach the recipient shortly.
        </p>

        {/* DETAILS */}
        <div className="bg-[#f7f3ed] rounded-2xl p-6 text-left space-y-4 mb-8">
          <div className="flex justify-between text-sm">
            <span className="text-[#7a7166]">Gift Amount</span>
            <span className="text-[#3f3a33] font-medium">
              ₹{amount.toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-[#7a7166]">Sent To</span>
            <span className="text-[#3f3a33] font-medium">
              {email}
            </span>
          </div>

          {message && (
            <div className="text-sm">
              <p className="text-[#7a7166] mb-1">Your Message</p>
              <p className="italic text-[#3f3a33]">
                “{message}”
              </p>
            </div>
          )}
        </div>

        {/* INFO */}
        <p className="text-[13px] text-[#7a7166] mb-10">
          The recipient can redeem this gift card online at checkout.
        </p>

        {/* ACTIONS */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/collections"
            className="
              bg-[#3f3a33] text-white
              px-8 py-3 rounded-full
              text-sm font-medium
              hover:bg-[#2f2a25]
              transition
            "
          >
            Continue Shopping
          </Link>

          <button
            onClick={() => navigate("/")}
            className="
              px-8 py-3 rounded-full
              text-sm font-medium
              border border-[#d8d2c7]
              text-[#3f3a33]
              hover:bg-[#f4eee6]
              transition
            "
          >
            Go to Home
          </button>
        </div>

      </div>
    </section>
  );
};

export default GiftCardSuccess;
