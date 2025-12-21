import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { listProducts } from "../services/productService";

const RoomCategoryPage = () => {
  const { room, category } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const load = async () => {
      const all = await listProducts();
      const filtered = all.filter(
        (p) =>
          p.room?.toLowerCase() === room.toLowerCase() &&
          p.category === category
      );
      setProducts(filtered);
    };
    load();
  }, [room, category]);

  return (
    <div className="max-w-7xl mx-auto px-8 pt-28">
      <h1 className="text-3xl font-semibold capitalize mb-8">
        {category.replace("-", " ")} for {room.replace("-", " ")}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((p) => (
          <div
            key={p._id}
            onClick={() => navigate(`/products/${p._id}`)}
            className="group relative cursor-pointer overflow-hidden rounded-xl bg-white"
          >
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}${p.img}`}
              className="h-64 w-full object-cover group-hover:scale-105 transition"
            />

            <div className="absolute inset-0 bg-black/50 opacity-0 
              group-hover:opacity-100 transition flex flex-col justify-end p-4">
              <p className="text-white font-medium">{p.name}</p>
              <p className="text-white text-sm">₹{p.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomCategoryPage;
