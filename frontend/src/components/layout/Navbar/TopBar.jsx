import React from "react";
import { FiMail, FiGift, FiMapPin } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const TopBar = () => {
  const navigate = useNavigate();

  const openLocation = () => {
    window.open(
      "https://www.google.com/maps/search/furniture+store",
      "_blank"
    );
  };

  const sendMail = () => {
    window.location.href = "mailto:arhomespace@gmail.com";
  };

  return (
    <div className="text-white text-[13px] py-1 border-b border-white/20">
      <div className="max-w-8xl mx-auto flex justify-between items-center px-4">

        {/* LEFT */}
        <div className="flex items-center">

          {/* Store Location */}
          <button
            onClick={openLocation}
            className="flex items-center gap-2 px-2 hover:opacity-100 opacity-80 transition"
          >
            <FiMapPin size={14} />
            Store Location
            <span className="ml-2 h-4 w-px bg-white/30"></span>
          </button>

          {/* Email */}
          <button
            onClick={sendMail}
            className="flex items-center gap-2 px-2 hover:opacity-100 opacity-80 transition"
          >
            <FiMail size={14} />
            arhomespace@gmail.com
          </button>

        </div>

        {/* RIGHT */}
        <div className="hidden md:flex items-center">

          {/* Gift Cards */}
          <button
            onClick={() => navigate("/gift-cards")}
            className="flex items-center gap-2 px-2 hover:opacity-100 opacity-80 transition"
          >
            <FiGift size={14} />
            Gift Cards
            <span className="ml-2 h-4 w-px bg-white/30"></span>
          </button>

          {/* FAQ */}
          <button
            onClick={() => navigate("/faq")}
            className="px-2 hover:opacity-100 opacity-80 transition"
          >
            FAQ
          </button>

        </div>

      </div>
    </div>
  );
};

export default TopBar;
