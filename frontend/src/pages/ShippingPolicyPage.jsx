import React, { useState } from "react";
import {
  FiTruck,
  FiMapPin,
  FiClock,
  FiAlertTriangle,
  FiHelpCircle,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";


/* ---------------- Accordion Item ---------------- */
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
const ShippingPolicyPage = () => {
  const navigate = useNavigate();
  return (
    <section className="bg-[#fbf9f6] min-h-screen pt-30 pb-32 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-20 max-w-3xl">
          <p className="uppercase text-[11px] tracking-[0.35em] text-[#8a8177] mb-6">
            Policy
          </p>
          <h1 className="text-[38px] sm:text-[44px] font-medium text-[#3f3a33] mb-6">
            Shipping Policy
          </h1>
          <p className="text-[15px] text-[#6b6258]">
            Clear timelines. No guesswork. Furniture delivered right.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl p-14 shadow-[0_25px_70px_rgba(0,0,0,0.06)] space-y-10">

          <PolicyItem icon={FiTruck} title="Delivery Time">
            Orders are typically delivered within 7–14 business days,
            depending on product type, customization, and delivery location.
          </PolicyItem>

          <PolicyItem icon={FiMapPin} title="Shipping Locations">
            We currently ship across major cities and serviceable pin codes.
            Remote areas may have extended delivery timelines.
          </PolicyItem>

          <PolicyItem icon={FiClock} title="Shipping Charges">
            Shipping charges, if applicable, are clearly shown at checkout
            before order confirmation — no surprises later.
          </PolicyItem>

          <PolicyItem icon={FiAlertTriangle} title="Delays & Exceptions">
            Delays due to weather, logistics disruptions, or regional
            restrictions will be proactively communicated via email or SMS.
          </PolicyItem>

          {/* Help CTA */}
          <div className="mt-12 rounded-2xl bg-[#f6f4f1] p-8 flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="flex items-start gap-4">
              <FiHelpCircle className="text-xl text-[#8a8177] mt-1" />
              <div>
                <h3 className="text-lg font-medium text-[#3f3a33]">
                  Questions about your delivery?
                </h3>
                <p className="text-sm text-[#6b6258] mt-1">
                  Track orders, update addresses, or talk to support.
                </p>
              </div>
            </div>

            <button
              onClick={() => navigate("/contact")}
              className="px-7 py-3 rounded-full bg-[#3f3a33] text-white text-sm hover:opacity-90 transition"
            >
              Contact Support
            </button>

          </div>

        </div>
    

      </div>
    </section>
  );
};

export default ShippingPolicyPage;
