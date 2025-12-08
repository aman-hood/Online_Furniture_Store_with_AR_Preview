
import React from "react";
import { bestSellers } from "./bestsellerData";
import BestSellerCard from "./BestSellerCard";
import HorizontalScroller from "./HorizontalScroller";

const BestSellers = () => {
  return (
    <section className="pt-20 ml-28 bg-white">
      <div className="max-w-8xl">

        <h2 className="text-4xl font-semibold pb-10 tracking-wide">BESTSELLERS</h2>

        <HorizontalScroller>
          {bestSellers.map((item) => (
            <BestSellerCard key={item.id} product={item} />
          ))}
        </HorizontalScroller>

      </div>
    </section>
  );
};

export default BestSellers;
