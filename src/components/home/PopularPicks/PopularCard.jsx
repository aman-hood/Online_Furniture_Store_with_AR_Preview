import React from "react";
import { FiHeart } from "react-icons/fi";

const PopularCard = ({ product }) => {
  return (
    <div className="w-60 cursor-pointer select-none">

      {/* IMAGE CONTAINER */}
      <div className="relative w-full h-64 bg-white border border-gray-300 rounded-lg overflow-hidden flex items-center justify-center group">

        {/* Sale Badge */}
        {product.sale && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded z-20">
            {product.sale}
          </span>
        )}

        {/* Wishlist */}
        <button className="absolute top-3 right-3 text-gray-600 hover:text-black transition z-20">
          <FiHeart size={18} />
        </button>

        {/* Image */}
        <img
          src={product.img}
          alt={product.name}
          className="w-full h-full object-cover transition duration-300 group-hover:scale-115 "
        />
      </div>

      {/* NAME */}
      <p className="mt-3 text-gray-700 font-medium text-sm">{product.name}</p>

      {/* RATING */}
      <div className="text-yellow-500 text-sm mt-1">
        {"⭐".repeat(Math.round(product.rating))}
      </div>

      {/* PRICE */}
      <div className="flex gap-2 text-sm items-center mt-1">
        <span className="font-semibold text-black">₹{product.price}</span>
        <span className="line-through text-gray-400 font-semibold">₹{product.oldPrice}</span>
      </div>

    </div>
  );
};

export default PopularCard;
