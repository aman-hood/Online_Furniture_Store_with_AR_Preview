import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./BestSellerCard";
import HorizontalScroller from "./HorizontalScroller";

const BestSellers = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/products/best-sellers",
          { withCredentials: true }
        );

        setProducts(res.data.products); // 🔥 BACKEND DATA
      } catch (err) {
        console.error("Failed to load best sellers", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) return <p className="pt-20 ml-28">Loading best sellers…</p>;

  return (
    <section className="pt-20 ml-28 bg-white">
      <h2 className="text-4xl font-semibold pb-10 tracking-wide">
        BESTSELLERS
      </h2>

      <HorizontalScroller>
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
          />
        ))}
      </HorizontalScroller>
    </section>
  );
};

export default BestSellers;
