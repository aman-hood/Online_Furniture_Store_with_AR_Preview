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
      <div className="max-w-8xl mx-auto flex justify-between items-center px-4">
        <div className="flex items-center">
          <button className="flex items-center gap-2 px-2 opacity-80 hover:opacity-100">
            <FiMapPin size={14} /> Store Location
          </button>
          <button className="flex items-center gap-2 px-2 opacity-80 hover:opacity-100">
            <FiMail size={14} /> arhomespace@gmail.com
          </button>
        </div>

        <div className="hidden md:flex items-center">
          <button
            onClick={() => navigate("/gift-cards")}
            className="flex items-center gap-2 px-2 opacity-80 hover:opacity-100"
          >
            <FiGift size={14} /> Gift Cards
          </button>
          <button
            onClick={() => navigate("/faq")}
            className="px-2 opacity-80 hover:opacity-100"
          >
            FAQ
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
