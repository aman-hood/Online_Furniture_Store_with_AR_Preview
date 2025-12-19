import React, { useState } from "react";
import {
  FiRefreshCcw,
  FiCreditCard,
  FiXCircle,
  FiHelpCircle,
} from "react-icons/fi";

/* ---------------- According Item ---------------- */
const PolicyItem = ({ icon: Icon, title, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b last:border-none pb-6">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between text-left group"
      >
        <div className="flex items-center gap-4">
          <Icon className="text-lg text-[#8a8177]" />
          <h2 className="text-lg font-medium text-[#3f3a33]">
            {title}
          </h2>
        </div>

        <span className="text-xl text-[#8a8177] group-hover:text-black transition">
          {open ? "−" : "+"}
        </span>
      </button>

      {open && (
        <p className="mt-4 ml-9 text-sm text-[#6b6258] leading-relaxed">
          {children}
        </p>
      )}
    </div>
  );
};

/* ---------------- Page ---------------- */
const RefundPolicyPage = () => {
  return (
    <section className="bg-[#fbf9f6] min-h-screen pt-28 pb-32 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-20 max-w-3xl">
          <p className="uppercase text-[11px] tracking-[0.35em] text-[#8a8177] mb-6">
            Policy
          </p>
          <h1 className="text-[38px] sm:text-[44px] font-medium text-[#3f3a33] mb-6">
            Refunds & Returns
          </h1>
          <p className="text-[15px] text-[#6b6258]">
            Simple, transparent rules — no fine print drama.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl p-14 shadow-[0_25px_70px_rgba(0,0,0,0.06)] space-y-10">

          <PolicyItem
            icon={FiRefreshCcw}
            title="Return Eligibility"
          >
            Products can be returned within 7 days of delivery if unused,
            unassembled, and in original packaging with all tags intact.
          </PolicyItem>

          <PolicyItem
            icon={FiCreditCard}
            title="Refund Process"
          >
            After inspection, refunds are issued to the original payment
            method within 5–7 business days. You’ll get an email confirmation.
          </PolicyItem>

          <PolicyItem
            icon={FiXCircle}
            title="Non-Returnable Items"
          >
            Custom-made furniture, clearance items, and items marked
            “Final Sale” cannot be returned or refunded.
          </PolicyItem>

          {/* Help CTA */}
          <div className="mt-12 rounded-2xl bg-[#f6f4f1] p-8 flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="flex items-start gap-4">
              <FiHelpCircle className="text-xl text-[#8a8177] mt-1" />
              <div>
                <h3 className="text-lg font-medium text-[#3f3a33]">
                  Need help with a return?
                </h3>
                <p className="text-sm text-[#6b6258] mt-1">
                  Our support team is here — fast replies, no bots.
                </p>
              </div>
            </div>

            <button className="px-7 py-3 rounded-full bg-[#3f3a33] text-white text-sm hover:opacity-90 transition">
              Contact Support
            </button>
          </div>

        </div>

        {/* Footer */}
        <p className="text-center text-sm text-[#8a8177] mt-24">
          Refund policy updated · March 2025
        </p>

      </div>
    </section>
  );
};

export default RefundPolicyPage;
