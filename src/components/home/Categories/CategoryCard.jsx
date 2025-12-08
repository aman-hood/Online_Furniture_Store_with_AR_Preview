import React from "react";

const CategoryCard = ({ title, img, variant = "normal", textPosition = "bottom-left" }) => {
  const sizeClasses = {
    tall: "h-[450px]",
    wide: "h-[280px]",
  };

  const textPositionClasses = {
    "bottom-left": "bottom-4 left-4",
    "bottom-right": "bottom-4 right-4",
    "top-left": "top-4 left-4",
    "top-right": "top-4 right-4",
  };

  return (
    <div className={`relative group rounded-2xl overflow-hidden shadow-md bg-white ${sizeClasses[variant]}`}>

      <img
        src={img}
        alt={title}
        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

      <h3
        className={`absolute ${textPositionClasses[textPosition]} 
          text-white tracking-wide text-sm font-medium drop-shadow
          opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 
          transition-all duration-500`}
      >
        {title}
      </h3>

    </div>
  );
};

export default CategoryCard;
