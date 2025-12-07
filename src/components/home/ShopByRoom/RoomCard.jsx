import React from "react";

const RoomCard = ({ title, img, variant = "tall", textPosition = "bottom-left" }) => {
  const sizeClasses = {
    tall: "h-[350px]",
    wide: "h-[280px]",
  };

  const positionClasses = {
    "bottom-left": "bottom-4 left-4",
    "bottom-right": "bottom-4 right-4",
    "top-left": "top-4 left-4",
    "top-right": "top-4 right-4",
  };

  return (
    <div className={`relative group rounded-xl overflow-hidden bg-white w-full ${sizeClasses[variant]}`}>

      {/* IMAGE */}
      <img
        src={img}
        alt={title}
        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition duration-500"></div>

      {/* TITLE */}
      <h3
        className={`absolute ${positionClasses[textPosition]} 
          text-white text-xl font-semibold tracking-wide opacity-0
          group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 
          transition-all duration-500`}
      >
        {title}
      </h3>

    </div>
  );
};

export default RoomCard;
