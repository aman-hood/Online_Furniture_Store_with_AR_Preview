import React from "react";
import CategoryCard from "./CategoryCard";

const CategoryGrid = ({ categories }) => {
  return (
    <div className="w-full px-6 max-w-7xl mx-auto space-y-6">

      {/* Row 1 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <CategoryCard title={categories[0].title} img={categories[0].img} variant="tall" textPosition="top-right"/>
        <CategoryCard title={categories[1].title} img={categories[1].img} variant="tall" textPosition="bottom-left"/>
        <CategoryCard title={categories[2].title} img={categories[2].img} variant="tall" textPosition="bottom-right" />
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <CategoryCard title={categories[3].title} img={categories[3].img} variant="wide" textPosition="top-right"/>
        <CategoryCard title={categories[4].title} img={categories[4].img} variant="wide" textPosition="top-left"/>
      </div>

    </div>
  );
};

export default CategoryGrid;
