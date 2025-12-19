import React, { useState } from "react";

const TrackOrderPage = () => {
  const [trackingId, setTrackingId] = useState("");
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // FUNCTIONAL: Mock API Call to find order
  const handleTrackOrder = async () => {
    if (!trackingId) return;
    
    setLoading(true);
    setError("");
    setOrderData(null);

    // Simulate a database delay (e.g. Firebase/API fetch)
    setTimeout(() => {
      // Logic: If ID is "123", show success. Else, show error.
      if (trackingId === "123") {
        setOrderData({
          orderNumber: "#HS-77210",
          destination: "Manhattan, NY",
          arrival: "Oct 18, 2025",
          steps: [
            { status: "Order Placed", date: "Oct 12", completed: true },
            { status: "In Production", date: "Oct 14", completed: true },
            { status: "In Transit", date: "Pending", completed: false },
          ]
        });
      } else {
        setError("Order reference not found. Please verify the ID.");
      }
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="relative min-h-screen bg-[#F9F7F2] text-[#2D2926] pt-32 px-6">
      <div className="max-w-xl mx-auto mb-20 text-center">
        <h1 className="text-[48px] font-light tracking-tighter mb-8">Track <span className="italic font-serif">Journey</span></h1>
        
        {/* INPUT FIELD */}
        <div className="relative">
          <input 
            type="text" 
            placeholder="ENTER TRACKING ID (Try '123')" 
            className="w-full bg-transparent border-b border-[#E7DFD4] py-4 text-[13px] tracking-widest outline-none focus:border-[#1A1816] transition-all"
            onChange={(e) => setTrackingId(e.target.value)}
          />
          <button 
            onClick={handleTrackOrder}
            className="absolute right-0 bottom-4 uppercase text-[11px] font-bold hover:text-[#8a8177]"
          >
            {loading ? "Searching..." : "Locate"}
          </button>
        </div>
        {error && <p className="mt-4 text-red-800 text-xs tracking-widest uppercase">{error}</p>}
      </div>

      {/* DYNAMIC CONTENT: Only shows if orderData exists */}
      {orderData && (
        <div className="max-w-4xl mx-auto bg-white/40 backdrop-blur-md rounded-[40px] p-12 animate-fadeIn">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <p className="text-[10px] uppercase text-[#8a8177] mb-2 tracking-[0.3em]">Status for {orderData.orderNumber}</p>
                <p className="text-2xl font-serif italic mb-8">Traveling to {orderData.destination}</p>
              </div>

              <div className="space-y-8 relative">
                <div className="absolute left-[7px] top-2 bottom-2 w-px bg-[#E7DFD4]" />
                {orderData.steps.map((step, i) => (
                  <div key={i} className="relative pl-10">
                    <div className={`absolute left-0 top-1.5 h-4 w-4 rounded-full border-2 border-white ${step.completed ? 'bg-black' : 'bg-[#E7DFD4]'}`} />
                    <p className={`text-[13px] uppercase tracking-widest ${step.completed ? 'text-black' : 'text-[#A19B91]'}`}>{step.status}</p>
                    <p className="text-xs text-[#8a8177] italic">{step.date}</p>
                  </div>
                ))}
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default TrackOrderPage;