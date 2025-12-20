import React, { useState } from "react";
import { Link } from "react-router-dom";

const faqs = [
  {
    question: "How do I purchase a gift card?",
    answer:
      "You can purchase a gift card directly from our Gift Cards page by selecting an amount, adding recipient details, and completing checkout.",
  },
  {
    question: "How will the gift card be delivered?",
    answer:
      "Gift cards are delivered digitally to the recipient’s email address immediately after successful payment.",
  },
  {
    question: "Can gift cards be used online?",
    answer:
      "Yes, gift cards can be redeemed online during checkout on our website.",
  },
  {
    question: "Do gift cards expire?",
    answer:
      "Our gift cards do not expire unless otherwise mentioned at the time of purchase.",
  },
  {
    question: "Can I use a gift card with other offers?",
    answer:
      "Gift cards can be combined with most ongoing offers unless stated otherwise.",
  },
  {
    question: "What happens if I return an item purchased with a gift card?",
    answer:
      "Any eligible refund will be credited back to the same gift card.",
  },
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-[#fbf9f6] min-h-screen">

      {/* HERO */}
      <div className="max-w-5xl mx-auto px-6 pt-30 pb-14 text-center">
        <p className="uppercase text-[12px] tracking-[0.35em] text-[#7a7166] mb-4">
          Help & Support
        </p>

        <h1 className="text-[32px] sm:text-[40px] font-medium text-[#3f3a33] mb-4">
          Frequently Asked Questions
        </h1>

        <p className="max-w-xl mx-auto text-[15px] text-[#6b6258]">
          Find answers to common questions about orders, gift cards, and
          deliveries.
        </p>
      </div>

      {/* FAQ LIST */}
      <div className="max-w-4xl mx-auto px-6 pb-16">
        <div className="space-y-4">
          {faqs.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-[0_12px_30px_rgba(0,0,0,0.06)]"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex justify-between items-center px-6 py-5 text-left"
              >
                <span className="text-[16px] font-medium text-[#3f3a33]">
                  {item.question}
                </span>

                <span className="text-[#7a7166] text-xl">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>

              {openIndex === index && (
                <div className="px-6 pb-6 text-[15px] text-[#5f564c] leading-relaxed">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

  
      

    </section>
  );
};

export default Faq;
