// not used 

import React, { useEffect, useState } from "react";
import MasonryGrid from "../components/shop/MasonryGrid";
import { listProducts } from "../services/productService";

const ShopPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const prods = await listProducts({});
        setProducts(prods);
      } catch (e) {
        setProducts([]);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="pt-30 px-10  mx-auto bg-[#d2cfc8]">
      
      {/* Title */}
      <h2 style={{ fontFamily: "'Great Vibes', cursive" }}
       className="text-6xl  tracking-wide capitalize text-[#1a1816] mb-3">
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
