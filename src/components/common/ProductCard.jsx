import React from "react";
import { FiHeart } from "react-icons/fi";

const ProductCard = ({ product }) => {
  return (
    <div className="cursor-pointer">

      {/* IMAGE BOX */}
      <div className="relative w-70 h-65 bg-white border border-gray-500 flex items-center justify-center">

        {/* Wishlist Icon */}
        <button className="absolute top-3 right-3 text-gray-700 hover:text-black">
          <FiHeart size={18} />
        </button>

        {/* PRODUCT IMAGE */}
        <img
          src={product.img}
          alt={product.name}
          className="w-full h-full "
        />
      </div>

      {/* TEXT */}
      <p className="text-gray-600 text-sm mt-3">{product.name}</p>
      <p className="font-semibold text-gray-900 text-base">{product.price}</p>

    </div>
  );
};

export default ProductCard;
