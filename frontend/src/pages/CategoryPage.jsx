import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { listProducts } from "../services/productService";
import MasonryGrid from "../components/shop/MasonryGrid";
import { useApp } from "../context/AppContext";

export default function CategoryPage() {
  const { category } = useParams();
  const [all, setAll] = useState([]);
  const [sortType, setSortType] = useState("");
  const [priceRange, setPriceRange] = useState([0, 500000]);

  const { wishlistIds = [] } = useApp(); // ✅ KEY LINE

  useEffect(() => {
    const fetchData = async () => {
      try {
        const prods = await listProducts({
          category: category?.toLowerCase(),
        });
        setAll(prods);
      } catch {
        setAll([]);
      }
    };

    fetchData();
  }, [category]);

  const filtered = useMemo(() => {
    let data = all.filter(
      (item) =>
        item.price >= priceRange[0] &&
        item.price <= priceRange[1]
    );

    if (sortType === "low-high") data.sort((a, b) => a.price - b.price);
    else if (sortType === "high-low") data.sort((a, b) => b.price - a.price);
    else if (sortType === "latest")
      data.sort(
        (a, b) =>
          new Date(b.createdAt || 0) -
          new Date(a.createdAt || 0)
      );

    return data;
  }, [all, sortType, priceRange]);

 return (
  <div className="bg-[#e8e4d8] min-h-screen w-full">

    {/* 🌿 CATEGORY HEADER */}
    <section className="pt-30 pb-12 px-10 text-center">
      <h1 style={{ fontFamily: "'Great Vibes', cursive" }}
       className="text-6xl  tracking-tight capitalize text-[#1a1816]">
        {category} Collection
      </h1>
      <p className="text-gray-600 max-w-2xl mx-auto">
        Thoughtfully curated pieces designed to elevate modern living.
      </p>
    </section>

    {/* 🔍 FILTER BAR – FULL WIDTH */}
    <section className="px-10 mb-10">
      <div
        className="
          w-full
          flex flex-wrap justify-between items-center gap-6
          bg-white/70 backdrop-blur-md
          border border-black/5
          rounded-2xl
          px-8 py-4
          shadow-sm
        "
      >
        {/* PRICE */}
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-gray-700">Price</span>
          <select
            className="
              bg-transparent
              border border-black/10
              rounded-lg
              px-4 py-2
              text-sm
              focus:outline-none
              focus:ring-1 focus:ring-black/20
            "
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

        {/* SORT */}
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-gray-700">Sort</span>
          <select
            className="
              bg-transparent
              border border-black/10
              rounded-lg
              px-4 py-2
              text-sm
              focus:outline-none
              focus:ring-1 focus:ring-black/20
            "
            onChange={(e) => setSortType(e.target.value)}
          >
            <option value="">Popular</option>
            <option value="latest">Newest</option>
            <option value="low-high">Price: Low → High</option>
            <option value="high-low">Price: High → Low</option>
          </select>
        </div>
      </div>
    </section>

    {/* 📦 PRODUCT COUNT */}
    <div className="px-10 mb-6">
      <p className="text-sm text-gray-600">
        Showing <span className="font-medium text-[#1a1816]">{filtered.length}</span> items
      </p>
    </div>

    {/* 🪑 PRODUCTS – EDGE TO EDGE */}
    <section className="px-6 pb-20">
      <MasonryGrid products={filtered} />
    </section>

  </div>
);

}
