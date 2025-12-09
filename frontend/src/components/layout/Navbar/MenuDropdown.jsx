import React from "react";

const MenuDropdown = ({ items = [], sections = [], mega = false, open }) => {
  if (!open) return null;

  
  if (mega) {
    return (
      <div
        className="
          absolute top-full left-0 mt-4 p-8 rounded-xl shadow-lg z-50
          transition-all duration-200 bg-[#f7f3ed]
          border border-[#e6e2d9]
          flex gap-10 
        "
      >
        {sections.map((col, index) => (
          <div
            key={index}
            className={`min-w-[190px] ${
              index !== sections.length - 1 ? "border-r border-gray-300 pr-6" : ""
            }`}
          >
            {/* Column Heading */}
            <h3 className="text-sm font-semibold text-gray-700 mb-3 tracking-wide uppercase">
              {col.heading}
            </h3>

            {/* Column Items */}
            <ul className="space-y-1">
              {col.items.map((item, idx) => (
                <li
                  key={idx}
                  className="
                    cursor-pointer px-2 py-2 text-gray-700 rounded-md
                    border-b border-gray-300/40  text-xs
                    hover:bg-gray-200/60 transition
                  "
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  }


  return (
    <div
      className="
        absolute top-full left-0 mt-3 bg-white z-50
        w-48 p-4 rounded-xl shadow-xl border border-gray-200
      "
    >
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li
            key={index}
            className="
              cursor-pointer py-1 border-b border-gray-200/70 
              hover:text-gray-600 transition
            "
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuDropdown;
