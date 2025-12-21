
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const HOTSPOT_POSITIONS = {
  sofas: { x: 45, y: 70 },
  decor: { x: 28, y: 65 },
  tables: { x: 60, y: 80 },
  lamps: { x: 82, y: 43 },
  chairs: { x: 18, y: 78 },
};

const RoomHotspotSection = ({ roomImg, products }) => {
    console.log("Product categories:", products.map(p => p.category?.toLowerCase()));
console.log("Hotspot keys:", Object.keys(HOTSPOT_POSITIONS));

  const navigate = useNavigate();
  const [active, setActive] = useState(null);

  const hotspots = products
    .map((p) => {
      const key = p.category?.toLowerCase(); // normalize
      return HOTSPOT_POSITIONS[key]
        ? { ...p, ...HOTSPOT_POSITIONS[key] }
        : null;
    })
    .filter(Boolean); // remove non-mapped products

  return (
    <div className="relative w-full overflow-hidden mt-20">
      {/* ROOM IMAGE */}
      <img
        src={`${import.meta.env.VITE_BACKEND_URL}${roomImg}`}
        alt="Room"
        className="w-full block"
      />

      {/* HOTSPOTS */}
      {hotspots.map((p, i) => (
        <div
          key={p._id}
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            transform: "translate(-50%, -50%)",
          }}
          className="absolute"
        >
          <button
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
            onClick={() => navigate(`/products/${p._id}`)}
            className="w-5 h-5 bg-white rounded-full border-2 border-black flex items-center justify-center"
          >
            <span className="w-2 h-2 bg-black rounded-full" />
          </button>

          {active === i && (
            <div className="absolute left-6 top-1/2 -translate-y-1/2
                            bg-white shadow-lg rounded-lg p-3 w-48 z-20">
              <p className="text-sm font-medium">{p.name}</p>
              <p className="text-sm text-gray-600">₹{p.price}</p>
              <span className="text-xs underline block mt-1">
                View product →
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default RoomHotspotSection;
