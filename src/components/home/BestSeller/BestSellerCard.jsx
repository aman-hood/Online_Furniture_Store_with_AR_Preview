import React from "react";
import { FiHeart } from "react-icons/fi";

const BestSellerCard = ({ item }) => {
  return (
    <div>

      {/* IMAGE BOX */}
     <div className="relative w-60 h-56 bg-[#fafafa] border border-black flex items-center justify-center">

  {/* Heart Icon */}
  <button className="absolute top-3 right-3 text-gray-700 hover:text-black">
    <FiHeart size={18} />
  </button>

  {/* FULL IMAGE VISIBLE */}
  <img
    src={item.img}
    alt={item.name}
    className="w-full h-full object-cover"
  />
</div>


      {/* TITLE */}
      <p className="text-gray-600 text-sm mt-3">{item.name}</p>

      {/* PRICE */}
      <p className="font-semibold text-gray-900 text-base">{item.price}</p>

    </div>
  );
};

export default BestSellerCard;
