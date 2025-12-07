import React, { useState } from "react";
import { popularPicks } from "./popularData";
import PopularCard from "./PopularCard";

const categories = ["bedroom", "sofa", "outdoor", "livingroom"];

const PopularPicks = () => {
  const [activeTab, setActiveTab] = useState("bedroom");

  return (
    <section className="py-20 bg-white max-w-7xl mx-auto px-8">

      {/* Section Title */}
      <h2 className="text-3xl font-semibold text-center">Today's Popular Picks</h2>
      <p className="text-center text-gray-500 text-sm mt-2">
        Items loved by our customers — refreshed daily
      </p>

      {/* Tabs */}
      <div className="flex justify-center gap-8 mt-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`text-lg pb-1 uppercase ${
              activeTab === cat
                ? "border-b-2 border-black text-black"
                : "text-gray-500 hover:text-black"
            }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-12 justify-items-center">

        {popularPicks[activeTab].map((product) => (
          <PopularCard key={product.id} product={product} />
        ))}

      </div>

    </section>
  );
};

export default PopularPicks;
