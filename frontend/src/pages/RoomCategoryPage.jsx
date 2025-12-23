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
      // ✅ get room data (image comes from here)
      const roomRes = await getRoomBySlug(room);
      setRoomData(roomRes);

      // products for that room
      const all = await listProducts();
      const filtered = all.filter(
        (p) => p.room?.toLowerCase() === room.toLowerCase()
      );
      setProducts(filtered);
    };

    load();
  }, [room]);

  // categories with image (option 2)
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

      {/* Room Title */}
      <h1 className="text-4xl font-semibold capitalize mb-10">
        {roomData.title}
      </h1>

      {/* ===================== */}
      {/* CATEGORY CARDS */}
      {/* ===================== */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 mb-16">

  {/* 🔙 BACK TO SHOP BY ROOM CARD */}
  <div
    onClick={() =>
      navigate("/", { state: { scrollTo: "shop-by-room" } })
    }
    className="cursor-pointer rounded-xl border-2 border-dashed
               bg-[#f6f4ef] p-6 flex flex-col items-center gap-4
               hover:bg-white hover:shadow-lg transition"
  >
    <div className="h-20 w-20 flex items-center justify-center
                    rounded-full border text-2xl">
      ←
    </div>
    <p className="font-medium text-center">
      Back to<br />Shop by Room
    </p>
  </div>

  {/* 🪑 CATEGORY CARDS */}
  {categories.map(([cat, image]) => (
    <div
      key={cat}
      onClick={() => navigate(`/collections/${cat}`)}
      className="cursor-pointer rounded-xl border bg-white p-6 
                 flex flex-col items-center gap-4
                 hover:shadow-lg transition"
    >
      <img
        src={`${import.meta.env.VITE_BACKEND_URL}${image}`}
        alt={cat}
        className="h-20 w-20 object-contain"
      />
      <p className="capitalize font-medium">{cat}</p>
    </div>
  ))}
</div>


      {/* ===================== */}
      {/* IKEA-STYLE ROOM IMAGE */}
      {/* ===================== */}
      <RoomHotspotSection
        roomImg={roomData.img}
        roomSlug={room}
        products={products}
      />


    </div>
  );
};

export default RoomOverviewPage;
