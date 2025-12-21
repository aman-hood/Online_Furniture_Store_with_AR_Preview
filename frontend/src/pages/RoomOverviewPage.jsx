import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { listProducts } from "../services/productService";
import { getRoomBySlug } from "../services/roomService";
import RoomHotspotSection from "./RoomHotspotSection";

const RoomOverviewPage = () => {
  const { room } = useParams();
  const navigate = useNavigate();

  const [roomData, setRoomData] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const load = async () => {
      const roomRes = await getRoomBySlug(room);
      setRoomData(roomRes);

      const all = await listProducts();
      const filtered = all.filter(
        (p) => p.room?.toLowerCase() === room.toLowerCase()
      );
      setProducts(filtered);
    };

    load();
  }, [room]);

  // OPTION 2: category image from first product
  const categories = useMemo(() => {
    const map = {};
    products.forEach((p) => {
      if (!map[p.category]) {
        map[p.category] = p.img;
      }
    });
    return Object.entries(map);
  }, [products]);

  if (!roomData) return null;

  return (
    <div className="max-w-7xl mx-auto px-8 pt-28">

      {/* TITLE */}
      <h1 className="text-4xl font-semibold mb-10">
        {roomData.title}
      </h1>

      {/* CATEGORY CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 mb-16">
        {categories.map(([cat, img]) => (
          <div
            key={cat}
            onClick={() => navigate(`/shop/${room}/${cat}`)}
            className="cursor-pointer rounded-xl border bg-white p-6 flex flex-col items-center gap-4 hover:shadow-lg transition"
          >
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}${img}`}
              alt={cat}
              className="h-20 w-20 object-contain"
            />
            <p className="capitalize font-medium">{cat}</p>
          </div>
        ))}
      </div>

      {/* IKEA STYLE ROOM IMAGE */}
      <RoomHotspotSection
        roomImg={roomData.img}
        products={products}
      />
    </div>
  );
};

export default RoomOverviewPage;
