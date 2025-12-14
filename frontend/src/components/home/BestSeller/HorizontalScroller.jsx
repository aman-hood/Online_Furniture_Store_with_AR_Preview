

import React, { useRef, useState, useEffect } from "react";
import { HiOutlineArrowLongRight, HiOutlineArrowLongLeft } from "react-icons/hi2";

const HorizontalScroller = ({ children }) => {
  const scrollRef = useRef(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;

    setCanLeft(el.scrollLeft > 0);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth);
  };

  useEffect(() => checkScroll(), []);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -300, behavior: "smooth" });
    setTimeout(checkScroll, 300);
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 300, behavior: "smooth" });
    setTimeout(checkScroll, 300);
  };

  return (
    <div className="relative">

      {/* SCROLLER */}
      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex flex-nowrap gap-10 overflow-x-scroll scroll-smooth no-scrollbar"
      >
        {children}
      </div>

      {/* LEFT ARROW */}
      <button
        onClick={scrollLeft}
        className={`absolute -bottom-14 right-20 ${
          canLeft ? "text-black" : "text-gray-300 cursor-default"
        }`}
      >
        <HiOutlineArrowLongLeft size={40} />
      </button>

      {/* RIGHT ARROW */}
      <button
        onClick={scrollRight}
        className={`absolute -bottom-14 right-5 ${
          canRight ? "text-black" : "text-gray-300 cursor-default"
        }`}
      >
        <HiOutlineArrowLongRight size={40} />
      </button>
    </div>
  );
};

export default HorizontalScroller;
