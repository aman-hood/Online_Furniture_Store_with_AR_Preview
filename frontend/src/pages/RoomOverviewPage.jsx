import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { listProducts } from "../services/productService";

const RoomOverviewPage = () => {
  const { room } = useParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const load = async () => {
      const all = await listProducts();

      // filter products by room
      const filtered = all.filter(
        (p) => p.room?.toLowerCase() === room.toLowerCase()
      );

      setProducts(filtered);
    };

    load();
  }, [room]);

  /**
   * 🔥 Derive categories with an image
   * category -> first product image
   */
  const categories = useMemo(() => {
    const map = {};

    products.forEach((p) => {
      if (!map[p.category]) {
        // IMPORTANT: use p.image OR p.img based on your DB
        map[p.category] = p.img; 
      }
    });

    return Object.entries(map); 
    // => [ ["beds", "/images/..."], ["lamps", "/images/..."] ]
  }, [products]);

  return (
    <div className="max-w-7xl mx-auto px-8 pt-28">

      {/* Room Title */}
      <h1 className="text-4xl font-semibold capitalize mb-10">
        {room.replace("-", " ")}
      </h1>

      {/* Category Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
        {categories.map(([cat, image]) => (
          <div
            key={cat}
            onClick={() => navigate(`/shop/${room}/${cat}`)}
            className="cursor-pointer rounded-xl border bg-white p-6 
                       flex flex-col items-center gap-4
                       hover:shadow-lg transition"
          >
            {/* Category Image (from first product) */}
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}${image}`}
              alt={cat}
              className="h-20 w-20 object-contain"
            />

            {/* Category Name */}
            <p className="capitalize font-medium">{cat}</p>
          </div>
        ))}
      </div>

    </div>
  );
};

export default RoomOverviewPage;
