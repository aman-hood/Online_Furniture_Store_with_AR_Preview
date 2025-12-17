import React from "react";

const CardItem = ({ active, onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className={`
        w-full rounded-2xl p-7 text-center transition-all duration-200
        ${
          active
            ? "bg-white shadow-[0_16px_40px_rgba(0,0,0,0.12)] scale-[1.02]"
            : "bg-[#f4eee6] hover:bg-[#efe7dc]"
        }
      `}
    >
      {children}
    </button>
  );
};

export default CardItem;
