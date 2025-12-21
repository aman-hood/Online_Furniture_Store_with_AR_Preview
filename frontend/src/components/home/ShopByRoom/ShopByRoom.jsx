import React, { useEffect, useState } from "react";
import RoomCard from "./RoomCard";
import { getRooms } from "../../../services/roomService";

const ShopByRoom = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const loadRooms = async () => {
      try {
        const data = await getRooms();
        setRooms(data);
      } catch {
        setRooms([]);
      }
    };
    loadRooms();
  }, []);

  if (!rooms.length) return null;

  return (
    <section className="py-20 bg-white max-w-7xl mx-auto px-8">
      <h2 className="text-4xl pb-3 tracking-wider text-center font-semibold">
        Shop by Room
      </h2>
      <p className="text-gray-600 text-center text-sm mb-10">
        Design each space with the perfect mood.
      </p>

      {/* ROW 1 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.slice(0, 3).map((room, i) => (
          <RoomCard
            key={room._id}
            title={room.title}
            img={`${import.meta.env.VITE_BACKEND_URL}${room.image}`}
            slug={room.slug}
            variant="tall"
            textPosition={i === 1 ? "bottom-left" : "top-left"}
          />
        ))}
      </div>

      {/* ROW 2 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
        {rooms.slice(3, 5).map((room) => (
          <RoomCard
            key={room._id}
            title={room.title}
            img={`${import.meta.env.VITE_BACKEND_URL}${room.image}`}
            slug={room.slug}
            variant="wide"
            textPosition="bottom-left"
          />
        ))}
      </div>
    </section>
  );
};

export default ShopByRoom;
