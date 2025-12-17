import React, { useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { bannerSlides } from "./BannerData";
import { Link } from "react-router-dom";

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
      setCurrent((prev) =>
        prev === 0 ? bannerSlides.length - 1 : prev - 1
      );
      setFade(true);
    }, 300);
  };

  return (
    <section className="relative w-full h-screen overflow-hidden">

      {/* BACKGROUND IMAGE */}
      <img
        src={bannerSlides[current].img}
        alt="Hero banner"
        className={`w-full h-full object-cover transition-opacity duration-700 ${
          fade ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* SOFT DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/20"></div>

      {/* TEXT CONTENT */}
      <div
        className={`absolute top-1/2 left-[8%] -translate-y-1/2 text-white
        transition-all duration-700
        ${fade ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"}`}
      >
        {/* SUBTITLE */}
        <p className="uppercase text-[12px] tracking-[0.32em] text-white/80 mb-4">
          {bannerSlides[current].subtitle}
        </p>

        {/* TITLE */}
        <h1 className="
          text-[32px] sm:text-[40px] md:text-[52px]
          font-medium leading-[1.15]
          max-w-[480px]
          mb-8
        ">
          {bannerSlides[current].title}
        </h1>

        {/* CTA */}
        <Link
          to="/collections"
          className="
            inline-flex items-center gap-2
            bg-[#f3e6d6] text-[#3f3a33]
            px-8 py-3
            rounded-2xl
            text-sm font-medium tracking-wide
            hover:bg-[#efe7dc]
            transition-all
          "
        >
          Shop collection
          <span className="translate-y-[1px]">→</span>
        </Link>
      </div>

      {/* LEFT ARROW */}
      <button
        onClick={prevSlide}
        className="
          absolute left-6 top-1/2 -translate-y-1/2
          p-3 rounded-full
          text-white
          bg-white/10
          hover:bg-white/20
          backdrop-blur
          transition
        "
      >
        <FiChevronLeft size={22} />
      </button>

      {/* RIGHT ARROW */}
      <button
        onClick={nextSlide}
        className="
          absolute right-6 top-1/2 -translate-y-1/2
          p-3 rounded-full
          text-white
          bg-white/10
          hover:bg-white/20
          backdrop-blur
          transition
        "
      >
        <FiChevronRight size={22} />
      </button>

      {/* DOTS */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3">
        {bannerSlides.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-2.5 h-2.5 rounded-full cursor-pointer transition ${
              current === index ? "bg-white" : "bg-white/40"
            }`}
          ></div>
        ))}
      </div>
    </section>
  );
};

export default HeroBanner;
