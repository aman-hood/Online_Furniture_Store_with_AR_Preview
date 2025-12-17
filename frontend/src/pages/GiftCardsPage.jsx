import React, { useState } from "react";
import { Link } from "react-router-dom";
import AmountSelector from "../components/gift/AmountSelector";
import GiftForm from "../components/gift/GiftForm";
import GiftPreview from "../components/gift/GiftPreview";
import HowItWorks from "../components/gift/HowItWorks";

const GiftCard = () => {
  const [selected, setSelected] = useState(5000);
  const [customAmount, setCustomAmount] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const finalAmount = customAmount ? Number(customAmount) : selected;

  return (
    <section className="bg-[#fbf9f6] min-h-screen">

      {/* HERO */}
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-12 text-center">
        <p className="uppercase text-[12px] tracking-[0.35em] text-[#7a7166] mb-4">
          Thoughtful Gifting
        </p>
        <h1 className="text-[34px] sm:text-[42px] md:text-[50px] font-medium text-[#3f3a33] mb-4">
          A Gift of Comfort & Style
        </h1>
        <p className="max-w-xl mx-auto text-[15px] text-[#6b6258]">
          Give the freedom to choose timeless furniture designed for everyday living.
        </p>
      </div>

      {/* MAIN */}
      <div className="max-w-5xl mx-auto px-6 pb-10">
        <AmountSelector
          selected={selected}
          customAmount={customAmount}
          setSelected={setSelected}
          setCustomAmount={setCustomAmount}
        />

        <div className="grid md:grid-cols-2 gap-8 mt-12 mb-12">
          <GiftForm
            email={email}
            message={message}
            setEmail={setEmail}
            setMessage={setMessage}
          />
          <GiftPreview amount={finalAmount} email={email} message={message} />
        </div>

        <div className="text-center">
          <Link
            to="/checkout"
            state={{ amount: finalAmount, email, message }}
            className="inline-flex items-center gap-2 bg-[#3f3a33] text-white px-12 py-3.5 rounded-full text-sm"
          >
            Continue with ₹{finalAmount.toLocaleString()} →
          </Link>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <HowItWorks />

    </section>
  );
};

export default GiftCard;
