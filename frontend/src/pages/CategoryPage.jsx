import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { listProducts } from "../services/productService";
import MasonryGrid from "../components/shop/MasonryGrid";

export default function CategoryPage() {
  
  const { category } = useParams();
  const [all, setAll] = useState([]);
  const [sortType, setSortType] = useState("");
  const [priceRange, setPriceRange] = useState([0, 500000]);

  useEffect(() => {
  const fetchData = async () => {
    try {
      const prods = await listProducts({
        category: category?.toLowerCase(),
      });
      setAll(prods);
      console.log("Fetched:", prods.length);
    } catch {
      setAll([]);
    }
  };

  fetchData();
}, [category]);


  // 🔥 Derived filtered list
  const filtered = useMemo(() => {
    let data = all.filter(
      (item) =>
        item.price >= priceRange[0] &&
        item.price <= priceRange[1]
    );

    if (sortType === "low-high") {
      data.sort((a, b) => a.price - b.price);
    } else if (sortType === "high-low") {
      data.sort((a, b) => b.price - a.price);
    } else if (sortType === "latest") {
      data.sort(
        (a, b) =>
          new Date(b.createdAt || 0) -
          new Date(a.createdAt || 0)
      );
    }

    return data;
  }, [all, sortType, priceRange]);
  

  return (
    <div className="pt-28 px-6 mx-auto">

      <h2 className="text-4xl font-serif mb-6 capitalize">
        {category} Collection
      </h2>

      <div className="flex flex-wrap justify-between items-center gap-4 mb-10 p-4 bg-[#f8f8f8] rounded-xl">

        {/* Price */}
        <div className="flex items-center gap-3">
          <label className="font-medium">Price:</label>
          <select
            className="border px-3 py-2 rounded-lg"
            onChange={(e) => {
              const val = e.target.value;
              if (val === "0-5000") setPriceRange([0, 5000]);
              else if (val === "5000-10000") setPriceRange([5000, 10000]);
              else if (val === "10000-50000") setPriceRange([10000, 50000]);
              else if (val === "50000-500000") setPriceRange([50000, 500000]);
              else setPriceRange([0, 500000]);
            }}
          >
            <option value="all">All Prices</option>
            <option value="0-5000">₹0 – ₹5,000</option>
            <option value="5000-10000">₹5,000 – ₹10,000</option>
            <option value="10000-50000">₹10,000 – ₹50,000</option>
            <option value="50000-500000">Above ₹50,000</option>
          </select>
        </div>

        {/* Sort */}
        <div className="flex items-center gap-3">
          <label className="font-medium">Sort:</label>
          <select
            className="border px-3 py-2 rounded-lg"
            onChange={(e) => setSortType(e.target.value)}
          >
            <option value="">Popular</option>
            <option value="latest">Newest</option>
            <option value="low-high">Price: Low → High</option>
            <option value="high-low">Price: High → Low</option>
          </select>
        </div>

      </div>

      <p className="text-gray-600 mb-10">
        Showing {filtered.length} items
      </p>

      <MasonryGrid products={filtered} />
    </div>
  );
}
