import React, { useRef, useState, useEffect } from "react";
import BestSellerCard from "./BestSellerCard";
import { bestSellers } from "./bestsellerData";
import { HiOutlineArrowLongRight, HiOutlineArrowLongLeft } from "react-icons/hi2";

const BestSellers = () => {
  const scrollRef = useRef(null);

  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  // Check scroll limits
  const checkArrows = () => {
    const el = scrollRef.current;
    if (!el) return;

    setCanLeft(el.scrollLeft > 0);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth);
  };

  useEffect(() => {
    checkArrows();
  }, []);

  const scrollLeft = () => {
    const el = scrollRef.current;
    if (!el) return;

    el.scrollBy({ left: -300, behavior: "smooth" });
    setTimeout(checkArrows, 300);
  };

  const scrollRight = () => {
    const el = scrollRef.current;
    if (!el) return;

    el.scrollBy({ left: 300, behavior: "smooth" });
    setTimeout(checkArrows, 300);
  };

  return (
    <section className="py-16 ml-28 bg-white">
      <div className="max-w-8xl mx-auto ">

        {/* Section Title */}
        <h2 className="text-3xl font-sans mb-5 tracking-wide">BESTSELLERS</h2>

        {/* WRAPPER */}
        <div className="relative pb-6">

          {/* PRODUCT ROW */}
          <div
            ref={scrollRef}
            onScroll={checkArrows}
            className="flex flex-nowrap gap-10 overflow-x-scroll scroll-smooth no-scrollbar"
          >
            {bestSellers.map((item) => (
              <BestSellerCard key={item.id} item={item} />
            ))}
          </div>

          {/* LEFT ARROW */}
          <button
            onClick={scrollLeft}
            disabled={!canLeft}
            className={`absolute -bottom-16 right-16 transition ${
              canLeft ? "text-black" : "text-gray-300 cursor-default"
            }`}
          >
            <HiOutlineArrowLongLeft size={40} />
          </button>

          {/* RIGHT ARROW */}
          <button
            onClick={scrollRight}
            disabled={!canRight}
            className={`absolute -bottom-16 right-5 transition ${
              canRight ? "text-black" : "text-gray-300 cursor-default"
            }`}
          >
            <HiOutlineArrowLongRight size={40} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
