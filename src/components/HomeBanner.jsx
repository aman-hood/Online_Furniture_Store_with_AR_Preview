import React from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import lamp from "../assets/lamp.png";

const HeroBanner = () => {
  return (
    <section className="w-full relative">

      {/* FULL SCREEN HERO */}
      <div className="w-full min-h-screen bg-[#5F5550] ">

        {/* CONTENT GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 items-center h-full px-20">

          {/* LEFT SECTION */}
         <div className="text-white space-y-7 flex flex-col justify-end items-center w-[800px] h-[400px] text-center">
  
  <p className="uppercase text-sm tracking-[0.25em] opacity-90 -mb-1">
    10% OFF ALL ITEMS
  </p>

  <h1 className="text-6xl font-semibold leading-tight">
    Hanging lamp <br /> collections
  </h1>

  <button className="bg-black text-white px-7 py-3 rounded-md hover:bg-gray-900 transition">
    SHOP COLLECTION →
  </button>

</div>



          {/* RIGHT SECTION (Lamp) */}
          <div className="flex justify-end items-start ">
            <img
              src={lamp}
              alt="Lamp"
              className="h-[550px] object-contain drop-shadow-xl"
            />
          </div>

        </div>
      </div>

      {/* LEFT ARROW */}
      <button className="absolute left-6 top-1/2 -translate-y-1/2 hover:bg-black/40 text-white p-3 rounded-full transition  ">
        <FiChevronLeft size={24} />
      </button>

      {/* RIGHT ARROW */}
      <button className="absolute right-6 top-1/2 -translate-y-1/2  hover:bg-black/40 text-white p-3 rounded-full transition">
        <FiChevronRight size={24} />
      </button>

    </section>
  );
};

export default HeroBanner;
