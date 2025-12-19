import React from "react";
import { useNavigate } from "react-router-dom";


const MenuDropdown = ({ items = [], sections = [], mega = false, open }) => {
  const navigate = useNavigate();

  if (!open) return null;

  /* =========================
     MEGA MENU
  ========================= */
  if (mega) {
    return (
      <div
        className="
          absolute top-full mt-4 z-50
          left-1/2 -translate-x-[45%]

          bg-[#fbf9f6]
          rounded-3xl
          px-8 py-7
          flex gap-14

          backdrop-blur-[2px]
          origin-top
          animate-dropdown

          shadow-[0_24px_70px_rgba(0,0,0,0.18)]

          before:absolute before:-top-3 before:left-1/2
          before:-translate-x-1/2
          before:w-6 before:h-6
          before:bg-[#fbf9f6]
          before:rotate-45
          before:rounded-sm
        "
      >
        {sections.map((col, index) => (
          <div key={index} className="min-w-[180px]">
            
            {/* ✅ UNIFORM STRONG HEADING */}
            <h3
              className="
                text-xs font-semibold uppercase tracking-wider
                mb-6
                text-[#4a433b]
              "
            >
              {col.heading}
            </h3>

            {/* Items */}
            <ul className="space-y-2">
              {col.items.map((item, idx) => (
                <li
                  key={idx}
                  onClick={() => navigate(item.path)}
                  className="
                    group cursor-pointer
                    px-3 py-2 rounded-lg
                    text-[13px] text-[#5a534a]
                    hover:bg-[#efe7dc]
                  "
                >
                  <span className="inline-block group-hover:translate-x-0.5 transition">
                    {item.label}
                  </span>
                </li>
              ))}

            </ul>

          </div>
        ))}
      </div>
    );
  }

  /* =========================
     SIMPLE DROPDOWN
  ========================= */
  return (
    <div
      className="
        absolute top-full mt-3 z-50
        left-1/2 -translate-x-1/2

        w-52
        bg-[#fbf9f6]
        rounded-2xl
        px-4 py-3

        backdrop-blur-[2px]
        origin-top
        animate-dropdown

        shadow-[0_18px_50px_rgba(0,0,0,0.15)]

        before:absolute before:-top-3 before:left-1/2
        before:-translate-x-1/2
        before:w-5 before:h-5
        before:bg-[#fbf9f6]
        before:rotate-45
        before:rounded-sm
      "
    >
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li
            key={index}
            onClick={() => navigate(item.path)}
            className="
              group cursor-pointer
              px-3 py-2
              rounded-lg

              text-[13px] font-normal text-[#5a534a]

              transition-all duration-200
              hover:bg-[#efe7dc]
              hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)]
            "
          >
            <span className="inline-block transition-transform group-hover:translate-x-0.5">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuDropdown;
