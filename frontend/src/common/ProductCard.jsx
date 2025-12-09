import React from "react";
import { FiHeart } from "react-icons/fi";

const ProductCard = ({ product }) => {
  // More consistent heights (280–360)
  const randomHeight = Math.floor(Math.random() * 80) + 280;

  return (
    <div className="break-inside-avoid mb-8 cursor-pointer">

      {/* Card Container */}
      <div
        className="
          relative w-full rounded-xl overflow-hidden  bg-white group
          shadow-sm hover:shadow-xl transition-shadow duration-500
        "
        style={{ height: `${randomHeight}px` }}
      >
        {/* Floating Wishlist Icon */}
        <button
          className="
            absolute top-3 right-3 z-20 bg-white/80 p-2 rounded-full shadow 
            opacity-0 group-hover:opacity-100 
            scale-75 group-hover:scale-100 
            transition-all duration-300 ease-out
          "
        >
          <FiHeart size={18} className="text-gray-700" />
        </button>

        {/* Product Image */}
        <img
          src={product.img}
          alt={product.name}
          className="
            w-full h-full object-cover 
            group-hover:scale-105 
            transition duration-500
          "
        />

        
      </div>

      {/* Info Section */}
      <div className="mt-3 px-1">
        <p className="text-gray-800 font-medium">{product.name}</p>
        <p className="text-gray-900 font-semibold">₹{product.price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
