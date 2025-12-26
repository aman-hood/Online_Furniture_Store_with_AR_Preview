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

  // Category → image map
  const categories = useMemo(() => {
    const map = {};
    products.forEach((p) => {
      if (!map[p.category]) map[p.category] = p.img;
    });
    return Object.entries(map);
  }, [products]);

  if (!roomData) return null;

  return (
    <div className="bg-[#f6f4ef] min-h-screen">

      {/* 🟤 HERO SECTION */}
      <div className="relative h-[55vh] w-full overflow-hidden">
        <img
          src={roomData.img}
          alt={roomData.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/35" />

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center text-white px-6">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
            {roomData.title}
          </h1>
          <p className="mt-3 text-sm md:text-base text-gray-200 max-w-xl mx-auto">
            Thoughtfully curated furniture to elevate your {roomData.title.toLowerCase()}.
          </p>
        </div>
      </div>

      {/* 🟤 CONTENT */}
      <div className="mx-auto px-15 pt-20 pb-16">

        {/* CATEGORY SECTION */}
        <div className="mb-20">
          <h2 className="text-2xl font-semibold mb-8 text-[#1a1816]">
            Shop by Category
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {categories.map(([cat, img]) => (
              <div
                key={cat}
                onClick={() => navigate(`/collections/${cat}`)}
                className="group cursor-pointer rounded-2xl bg-white/70 backdrop-blur border border-white/40 shadow-sm hover:shadow-xl transition-all duration-300 p-6 flex flex-col items-center gap-4"
              >
                <div className="h-24 w-24 flex items-center justify-center">
                  <img
                    src={img}
                    alt={cat}
                    className="h-full w-full object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                <p className="capitalize font-medium text-[#1a1816] group-hover:underline">
                  {cat}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 🟤 ROOM HOTSPOT SECTION */}
        <div>
          <h2 className="text-2xl font-semibold mb-8 text-[#1a1816]">
            Visualize in Your Space
          </h2>

         <RoomHotspotSection
          roomImg={roomData.img}
          products={products}
          roomSlug={room}
        />

        </div>
      </div>
    </div>
  );
};

export default RoomOverviewPage;
