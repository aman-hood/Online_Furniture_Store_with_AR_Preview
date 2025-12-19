import React from "react";
import ProductCard from "../../common/ProductCard";

const MasonryGrid = ({ products }) => {
   console.log("Products:", products);
  console.log("First image:", products?.[0]?.img);
  return (
    
    <div className="mt-4">

      {/* subtle grid rhythm */}
      <div className="columns-1 sm:columns-3 lg:columns-5 gap-6">

        {products.map((product) => (
          <div
            key={product._id || product.id}
            className="
              break-inside-avoid mb-6
              transition-transform duration-300
              hover:-translate-y-0.5
            "
          >
            <div
              className="
                bg-white
                rounded-2xl
                shadow-[0_10px_30px_rgba(0,0,0,0.06)]
                hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)]
                transition-shadow
              "
            >
              <ProductCard product={product} />
              
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default MasonryGrid;
