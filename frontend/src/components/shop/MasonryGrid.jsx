import React from "react";
import ProductCard from "../../common/ProductCard";

const MasonryGrid = ({ products }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {products.map((product) => (
  <ProductCard
    key={product._id}   // ✅ UNIQUE & STABLE
    product={product}
  />
))}

    </div>
  );
};

export default MasonryGrid;
