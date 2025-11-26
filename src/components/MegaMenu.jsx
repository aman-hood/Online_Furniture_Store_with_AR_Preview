import React, { useState } from "react";

const MegaMenu = ({ title, columns }) => {
  const [open, setOpen] = useState(false);

  return (
    <div 
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* MENU BUTTON */}
      <button className="cursor-pointer flex items-center gap-1 text-white hover:text-gray-200 transition">
        {title}
        <span className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}>▾</span>
      </button>

      {/* MEGA MENU */}
      <div
        className={`
          absolute left-0 mt-4 rounded-xl shadow-2xl p-6 z-50
          transition-all duration-200
          ${open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3 pointer-events-none"}
        `}
        style={{
          backgroundColor: "#f7f3ed", // soft beige Pinterest-style background
          width: `${columns.length * 190}px`,
          display: "grid",
          gridTemplateColumns: `repeat(${columns.length}, 1fr)`,
          gap: "24px",
          border: "1px solid #eae7e1"
        }}
      >
        {columns.map((col, colIndex) => (
          <div 
            key={colIndex} 
            className={`pr-4 ${colIndex !== columns.length - 1 ? "border-r border-gray-300" : ""}`}
          >
            
            {/* Column heading */}
            <h3 className="text-sm font-semibold text-gray-600 mb-3 tracking-wide">
              {col.heading}
            </h3>

            {/* Items */}
            <ul className="flex flex-col">
              {col.items.map((item, itemIndex) => (
                <li 
                  key={itemIndex}
                  className="
                    px-2 py-2 text-gray-700 cursor-pointer
                    hover:bg-gray-200/60 rounded-md transition
                    border-b border-gray-300/40
                  "
                >
                  {item}
                </li>
              ))}
            </ul>

          </div>
        ))}
      </div>
    </div>
  );
};


export default MegaMenu;
