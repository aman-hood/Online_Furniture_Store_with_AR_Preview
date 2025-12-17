import React from "react";

export default function TrackOrderPage() {
  return (
    <div className="pt-28 px-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-semibold mb-4">Track Order</h1>
      <p className="text-gray-700 mb-6">Enter your order ID and email to track your order status.</p>
      <form className="space-y-4">
        <input className="w-full border rounded-lg px-4 py-3" placeholder="Order ID" />
        <input className="w-full border rounded-lg px-4 py-3" placeholder="Email" />
        <button type="button" className="px-5 py-3 bg-black text-white rounded-lg">Track</button>
      </form>
    </div>
  );
}
