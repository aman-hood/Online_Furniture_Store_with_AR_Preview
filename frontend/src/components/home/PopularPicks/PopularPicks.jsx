import { useEffect, useState } from "react";
import axios from "axios";
import PopularCard from "./PopularCard";

const categories = ["Decor", "Sofas", "Tables", "Wardrobes"];

const PopularPicks = () => {
  const [activeTab, setActiveTab] = useState("Decor");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const load = async () => {
      const res = await axios.get(
        "http://localhost:3000/api/products",
        { withCredentials: true }
      );

      setProducts(res.data.products);
    };

    load();
  }, []);

  const filtered = products.filter(
  (p) =>
    p.isPopular === true &&
    p.category?.toLowerCase() === activeTab.toLowerCase()
);




  return (
  
    <section className="pt-20 bg-white max-w-7xl mx-auto px-8">

      <h2 className="text-4xl font-semibold text-center">
        Today's Popular Picks
      </h2>

      <p className="text-center text-gray-600 text-sm mt-2">
        Items loved by our customers — refreshed daily
      </p>

      <div className="flex justify-center gap-8 mt-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`text-lg pb-1 uppercase ${
              activeTab === cat
                ? "border-b-2 border-black text-black"
                : "text-gray-500 hover:text-black"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-12 justify-items-center">
        {filtered.map((product) => (
          <PopularCard key={product._id} product={product} />
        ))}
      </div>

    </section>
  );
};

export default PopularPicks;
