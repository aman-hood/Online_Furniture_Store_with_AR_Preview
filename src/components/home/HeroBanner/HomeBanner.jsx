import React, { useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { bannerSlides } from "./BannerData";

const HeroBanner = () => {
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);

  // Auto slide
  useEffect(() => {
    const timer = setInterval(() => nextSlide(), 5000);
    return () => clearInterval(timer);
  }, [current]);

  const nextSlide = () => {
    setFade(false);
    setTimeout(() => {
      setCurrent((prev) => (prev + 1) % bannerSlides.length);
      setFade(true);
    }, 300);
  };

  const prevSlide = () => {
    setFade(false);
    setTimeout(() => {
      setCurrent((prev) => (prev === 0 ? bannerSlides.length - 1 : prev - 1));
      setFade(true);
    }, 300);
  };

  return (
    <section className="relative w-full h-screen overflow-hidden">

      {/* BACKGROUND IMAGE */}
      <img
        src={bannerSlides[current].img}
        alt="Slide"
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          fade ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* TEXT OVERLAY */}
      <div
        className={`absolute top-1/2 left-[8%] -translate-y-1/2 text-white transition-all duration-700 ${
          fade ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
        }`}
      >
        <p className="uppercase text-sm tracking-[0.25em] opacity-80 mb-2">
          {bannerSlides[current].subtitle}
        </p>

        <h1 className="text-6xl font-semibold leading-tight max-w-xl mb-6">
          {bannerSlides[current].title}
        </h1>

        <button className="bg-black text-white px-8 py-3 rounded-md hover:bg-gray-900 transition">
          SHOP COLLECTION →
        </button>
      </div>

      {/* LEFT ARROW */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2  hover:bg-black/40 text-white border-1 p-3 rounded-full transition"
      >
        <FiChevronLeft size={20} />
      </button>

      {/* RIGHT ARROW */}
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2  hover:bg-black/40 text-white border-1 p-3 rounded-full transition"
      >
        <FiChevronRight size={20} />
      </button>

      {/* DOTS */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3">
        {bannerSlides.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-2 h-2 rounded-full cursor-pointer transition ${
              current === index ? "bg-white" : "bg-white/40"
            }`}
          ></div>
        ))}

      </div>
        

    </section>
  );
};

export default HeroBanner;
