import React from "react";
import { Link } from "react-router-dom";

const collection = [
  {
    name: "Sofas",
    image: "/src/assets/collection/sofa.png",
    link: "/collections/sofas"
  },
  {
    name: "Chairs",
    image: "/src/assets/collection/chair.png",
    link: "/collections/chairs"
  },
  {
    name: "Tables",
    image: "/src/assets/collection/table.png",
    link: "/collections/tables"
  },
  {
    name: "Beds",
    image: "/src/assets/collection/bed.png",
    link: "/collections/beds"
  },
  {
    name: "Wardrobes",
    image: "/src/assets/collection/wardrobe.png",
    link: "/collections/wardrobes"
  },
  {
    name: "Decor",
    image: "/src/assets/collection/decor.png",
    link: "/collections/decor"
  },
  {
    name: "Storage",
    image: "/src/assets/collection/storage.png",
    link: "/collections/storage"
  },
  {
    name: "Lamps",
    image: "/src/assets/collection/lamp.png",
    link: "/collections/lamps"
  },
  {
    name: "Outdoor Furniture",
    image: "/src/assets/collection/outdoor.png",
    link: "/collections/outdoor"
  },
  {
    name: "Office Furniture",
    image: "/src/assets/collection/outdoor.png",
    link: "/collections/office"
  }
];

export default function Collections() {
  return (
   <>


  <div className="min-h-screen bg-white px-5 pt-30">

    {/* Heading */}
    <div className="text-center mb-14">
      <h1 style={{ fontFamily: "'Great Vibes', cursive" }}
       className="text-6xl  tracking-tight text-[#1a1816]">
        Shop by Category
      </h1>
      <p className="mt-3 text-gray-600 text-lg tracking-wide">
        Discover curated pieces designed for modern living.
      </p>
    </div>

    {/* Masonry Grid */}
    <div className="grid md:grid-cols-3 gap-8 auto-rows-[300px]">
      {collection.map((cat, index) => (
        <Link
          key={cat.name}
          to={cat.link}
          className={`relative rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group 
          ${index % 5 === 0 ? "row-span-2" : ""}
          `}
        >
          <img
            src={cat.image}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />

          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all"></div>

          <h2 className="absolute bottom-6 left-6 text-white text-3xl font-serif drop-shadow-xl">
            {cat.name}
          </h2>
        </Link>
      ))}
    </div>

  </div>
</>




  );
}
