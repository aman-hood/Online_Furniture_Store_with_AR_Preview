import React from "react";
import { FiTrash2 } from "react-icons/fi";
import { FiShoppingCart } from "react-icons/fi";

// TEMP DATA — replace with backend later
const wishlistData = [
  {
    id: 1,
    name: "Modern Lounge Chair",
    price: "₹12,499",
    img: "/src/assets/bestSeller/chair.png",
  },
  {
    id: 2,
    name: "Velvet Sofa Set",
    price: "₹25,999",
    img: "/src/assets/bestSeller/chair.png",
  },
  {
    id: 3,
    name: "Wooden Dining Table",
    price: "₹18,499",
    img: "/src/assets/bestSeller/chair.png",
  }
];

export default function WishlistPage() {
  return (
    <div className="pt-28 px-10 max-w-7xl mx-auto">

      {/* Title */}
      <h1 className="text-4xl font-semibold mb-10 tracking-wide">My Wishlist</h1>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {wishlistData.map((item) => (
          <div
            key={item.id}
            className="group border rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition-all"
          >
            
            {/* Image */}
            <div className="w-full h-64 relative overflow-hidden">
              <img
                src={item.img}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
              />

              {/* Remove Icon */}
              <button className="absolute top-3 right-3 bg-white/80 p-2 rounded-full shadow hover:bg-white transition">
                <FiTrash2 size={18} className="text-black" />
              </button>
            </div>

            {/* Text */}
            <div className="p-5">
              <p className="text-gray-600 text-sm">{item.name}</p>
              <p className="font-semibold text-lg text-black">{item.price}</p>

              {/* Move to Cart */}
              <button
                className="
                  mt-4 w-full py-2 rounded-lg 
                  border border-black text-black
                  hover:bg-black hover:text-white
                  transition
                  flex items-center justify-center gap-2
                "
              >
                <FiShoppingCart size={18} />
                Move to Cart
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
