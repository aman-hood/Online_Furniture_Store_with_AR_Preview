import React from "react";

export default function GiftCardsPage() {
  return (
    <div className="pt-28 px-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold mb-4">Gift Cards</h1>
      <p className="text-gray-700 mb-6">Give the gift of choice with digital gift cards.</p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[1000, 2500, 5000].map((amt) => (
          <div key={amt} className="border rounded-xl p-5 bg-white">
            <div className="text-xl font-semibold mb-2">₹{amt}</div>
            <button className="px-4 py-2 bg-black text-white rounded-lg">Buy</button>
          </div>
        ))}
      </div>
    </div>
  );
}
