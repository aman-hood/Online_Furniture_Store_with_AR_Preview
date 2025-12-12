// not used 

import React from "react";
import MasonryGrid from "../components/shop/MasonryGrid";
import { products } from "../data/products";

const ShopPage = () => {
  return (
    <div className="pt-28 px-10 max-w-7xl mx-auto">
      
      {/* Title */}
      <h2 className="text-3xl font-semibold tracking-wide mb-6">
        Shop All Products
      </h2>

      {/* Filter Row */}
      <div className="flex justify-between items-center mb-10">
        <p className="text-gray-600">Showing {products.length} products</p>

        <select className="border px-4 py-2 rounded-md">
          <option>Sort by: Popular</option>
          <option>Latest</option>
          <option>Price: Low → High</option>
          <option>Price: High → Low</option>
        </select>
      </div>

      {/* Masonry Grid */}
      <MasonryGrid products={products} />

    </div>
  );
};

export default ShopPage;
