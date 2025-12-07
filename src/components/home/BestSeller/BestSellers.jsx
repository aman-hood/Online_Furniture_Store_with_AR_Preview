// src/components/home/BestSellers.jsx

import React from "react";
import { bestSellers } from "./bestsellerData";
import ProductCard from "../../common/ProductCard";
import HorizontalScroller from "../../common/HorizontalScroller";

const BestSellers = () => {
  return (
    <section className="py-16 ml-28 bg-white">
      <div className="max-w-8xl mx-auto">

        <h2 className="text-3xl font-sans mb-5 tracking-wide">BESTSELLERS</h2>

        <HorizontalScroller>
          {bestSellers.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </HorizontalScroller>

      </div>
    </section>
  );
};

export default BestSellers;
