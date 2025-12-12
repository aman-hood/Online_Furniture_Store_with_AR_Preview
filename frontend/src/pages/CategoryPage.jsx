
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { products } from "../data/products";
import MasonryGrid from "../components/shop/MasonryGrid";

export default function CategoryPage() {
  const { category } = useParams();

  // Initial filtered list
  const categoryProducts = products.filter(
    (item) => item.category.toLowerCase() === category.toLowerCase()
  );

  const [filtered, setFiltered] = useState(categoryProducts);
  const [sortType, setSortType] = useState("");
  const [priceRange, setPriceRange] = useState([0, 200000]); // min & max

  // Handle Sorting
  const handleSort = (value) => {
    setSortType(value);

    let sorted = [...filtered];

    if (value === "low-high") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (value === "high-low") {
      sorted.sort((a, b) => b.price - a.price);
    } else if (value === "latest") {
      sorted.sort((a, b) => b.id - a.id); 
    }

    setFiltered(sorted);
  };

  // Handle Price Filtering
  const handlePriceChange = (min, max) => {
    setPriceRange([min, max]);

    const updated = categoryProducts.filter(
      (item) => item.price >= min && item.price <= max
    );

    setFiltered(updated);
  };

  return (
    <div className="pt-28  px-6  mx-auto">

      {/* Title */}
      <h2 className="text-4xl font-serif tracking-tight mb-6 capitalize">
        {category} Collection
      </h2>

      {/* Filter Bar */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-10 p-4 bg-[#f8f8f8] rounded-xl shadow-sm">

        {/* Price Filter */}
        <div className="flex items-center gap-3">
          <label className="text-gray-700 font-medium">Price:</label>
          <select
            className="border px-3 py-2 rounded-lg"
            onChange={(e) => {
              const val = e.target.value;
              if (val === "0-5000") handlePriceChange(0, 5000);
              else if (val === "5000-10000") handlePriceChange(5000, 10000);
              else if (val === "10000-50000") handlePriceChange(10000, 50000);
              else handlePriceChange(0, 200000);
            }}
          >
            <option value="all">All Prices</option>
            <option value="0-5000">₹0 – ₹5,000</option>
            <option value="5000-10000">₹5,000 – ₹10,000</option>
            <option value="10000-50000">₹10,000 – ₹50,000</option>
            <option value="50000-500000">Above ₹50,000</option>
          </select>
        </div>

        {/* Sort Filter */}
        <div className="flex items-center gap-3">
          <label className="text-gray-700 font-medium">Sort:</label>
          <select
            className="border px-3 py-2 rounded-lg"
            onChange={(e) => handleSort(e.target.value)}
          >
            <option value="">Popular</option>
            <option value="latest">Newest</option>
            <option value="low-high">Price: Low → High</option>
            <option value="high-low">Price: High → Low</option>
          </select>
        </div>

      </div>
        <p className="text-gray-600 mb-10">
        Showing {filtered.length} {category} items
      </p>

      {/* Masonry Grid */}
      <MasonryGrid products={filtered} />
    </div>
  );
}

