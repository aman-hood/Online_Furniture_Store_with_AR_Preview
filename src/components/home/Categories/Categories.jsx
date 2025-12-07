import React from "react";
import { categories } from "./categoryData";

import CategoryGrid from "../../common/CategoryGrid";

const Categories = () => {
  return (
    <section className="py-5 bg-white w-full">


      <h2 className="text-3xl font-sans px-10 pb-9 tracking-wide">CATEGORIES</h2>

      <CategoryGrid categories={categories} />

      <div className="flex justify-center mt-15">
        <button className="px-8 py-2 border border-black text-black hover:bg-black hover:text-white transition">
          OPEN CATALOG
        </button>
      </div>

    </section>
  );
};

export default Categories;
