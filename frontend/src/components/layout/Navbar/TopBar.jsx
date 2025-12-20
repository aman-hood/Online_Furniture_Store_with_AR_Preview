import React from "react";
import { FiMail, FiGift, FiMapPin } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const TopBar = ({ isHome }) => {
  const navigate = useNavigate();

  return (
    <div
      className={`
        text-[13px] py-1 border-b
        ${isHome
          ? "bg-transparent text-white border-white/20"
          : "bg-[#f8f8f8] text-[#1a1816] border-black/10"}
      `}
    >
      <div className="w-full px-6 flex justify-between items-center">

        {/* LEFT — LOCATION + EMAIL */}
        <div className="flex items-center gap-4">
          <button
            onClick={() =>
              window.open(
                "https://www.google.com/maps/search/furniture+store",
                "_blank"
              )
            }
            className="flex items-center gap-2 opacity-80 hover:opacity-100 transition"
          >
            <FiMapPin size={14} />
            <span className="hidden sm:inline">Store Location</span>
          </button>

          <span className="h-4 w-px bg-current opacity-30" />

          <button
  onClick={() =>
    window.open(
      "https://mail.google.com/mail/?view=cm&fs=1&to=arhomespace@gmail.com",
      "_blank"
    )
  }
  className="flex items-center gap-2 opacity-80 hover:opacity-100 transition"
>
  <FiMail size={14} />
  <span className="hidden sm:inline">arhomespace@gmail.com</span>
</button>

        </div>

        {/* RIGHT — LINKS */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => navigate("/gift-cards")}
            className="flex items-center gap-2 opacity-80 hover:opacity-100 transition"
          >
            <FiGift size={14} />
            Gift Cards
          </button>

          <span className="h-4 w-px bg-current opacity-30" />

          <button
            onClick={() => navigate("/faq")}
            className="opacity-80 hover:opacity-100 transition"
          >
            FAQ
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
