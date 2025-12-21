import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { listProducts } from "../services/productService";

const ShopByRoomPage = () => {
  const { room } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      const all = await listProducts();
      const filtered = all.filter((p) => p.room === room);
      setProducts(filtered);
    };
    loadProducts();
  }, [room]);

  return (
    <div className="max-w-7xl mx-auto px-8 py-12">
      <h1 className="text-4xl font-semibold capitalize">
        {room.replace("-", " ")}
      </h1>
      <p className="text-gray-600 mt-2 mb-8">
        Furniture curated for your {room.replace("-", " ")}.
      </p>

      {products.length === 0 ? (
        <p>No products available for this room.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <div
              key={p._id}
              className="border rounded-xl p-4 hover:shadow-md transition"
            >
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}${p.image}`}
                className="h-40 w-full object-cover rounded-lg"
              />
              <h3 className="mt-3 font-medium">{p.name}</h3>
              <p className="text-sm text-gray-600">₹{p.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShopByRoomPage;

