import React from "react";
import ProductCard from "../../common/ProductCard";

const MasonryGrid = ({ products }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
  key={product._id}
  product={product}
  initiallyLiked={product.initiallyLiked}
/>

      ))}
    </div>
  );
};

export default MasonryGrid;
