import React from "react";
import BestSellerCard from "./BestSellerCard";
import { bestSellers } from "./bestsellerData";

const BestSellers = () => {
  return (
    <section className="py-16 ml-40 bg-white">
      <div className="max-w-8xl mx-auto px-4">

        <h2 className="text-3xl font-sans  mb-5 tracking-wide ">BESTSELLERS</h2>

   
        <div className="flex flex-nowrap gap-10">
          {bestSellers.map((item) => (
            <BestSellerCard key={item.id} item={item} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default BestSellers;
