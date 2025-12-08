

import React from "react";
import { FiHeart } from "react-icons/fi";

const ProductCard = ({ product }) => {
  return (
    <div className="cursor-pointer group ">

      {/* IMAGE BOX */}
      <div className="relative w-70 h-65 bg-white border border-gray-500 flex items-center justify-center overflow-hidden">

        {/* Wishlist Icon */}
        <button className="absolute top-3 right-3 text-gray-700 hover:text-black z-20">
          <FiHeart size={18} />
        </button>

        {/* PRODUCT IMAGE */}
        <img
          src={product.img}
          alt={product.name}
          className="w-full h-full group-hover:scale-110 transition duration-300"
        />
      </div>

      {/* TEXT */}
      <p className="text-gray-600 text-sm font-medium mt-3">{product.name}</p>
      <p className="font-semibold text-gray-900 text-base">{product.price}</p>

    </div>
  );
};

export default ProductCard;
