import React from "react";
import RoomCard from "./RoomCard";
import { roomData } from "./roomData";

const ShopByRoom = () => {
  return (
    <section className="py-20 bg-white max-w-7xl mx-auto px-8">

      {/* TITLE */}
      <h2 className="text-4xl pb-3 tracking-wider text-center font-semibold">Shop by Room</h2>
      <p className="text-gray-600 text-center text-sm mb-10">Design each space with the perfect mood.</p>

      {/* ROW 1 – 3 TALL CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <RoomCard title={roomData[0].title} img={roomData[0].img} variant="tall" textPosition="top-left" />
        <RoomCard title={roomData[1].title} img={roomData[1].img} variant="tall" textPosition="bottom-left" />
        <RoomCard title={roomData[2].title} img={roomData[2].img} variant="tall" textPosition="top-right" />
      </div>

      {/* ROW 2 – 2 WIDE CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
        <RoomCard title={roomData[3].title} img={roomData[3].img} variant="wide" textPosition="top-left" />
        <RoomCard title={roomData[4].title} img={roomData[4].img} variant="wide" textPosition="bottom-left" />
      </div>

     

    </section>
  );
};

export default ShopByRoom;
