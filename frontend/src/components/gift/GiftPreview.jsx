import React from "react";

const GiftPreview = ({ amount, email, message }) => {
  return (
    <div
      className="
        rounded-3xl bg-[#3f3a33] text-white
        p-7 flex flex-col justify-between
        shadow-[0_24px_60px_rgba(0,0,0,0.25)]
      "
    >
      <div>
        <p className="uppercase tracking-widest text-[11px] opacity-70 mb-3">
          AR HomeSpace Gift Card
        </p>

        <p className="text-2xl font-medium mb-5">
          ₹{amount.toLocaleString()}
        </p>

        {message && (
          <p className="text-sm opacity-90 italic leading-relaxed">
            “{message}”
          </p>
        )}
      </div>

      <p className="text-[11px] opacity-60 mt-8">
        Delivered digitally to {email || "recipient email"}
      </p>
    </div>
  );
};

export default GiftPreview;
