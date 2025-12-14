import React from "react";
import ProductCard from "../../common/ProductCard";

const MasonryGrid = ({ products }) => {
  return (
    <div
      className="
       columns-1 sm:columns-3 lg:columns-4 gap-6
      "
    >
      {products.map((product, index) => (
        <div
          key={product.id}
          className={`break-inside-avoid mb-6 animate-fadeUp delay-${(index % 5) + 1}`}
        >
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
};

export default MasonryGrid;
