import React from "react";

export default function OrdersPage() {
  const orders = [];
  return (
    <div className="pt-30 px-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-semibold mb-4">My Orders</h1>
      {orders.length === 0 ? (
        <p className="text-gray-600">You have no orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((o) => (
            <div key={o.id} className="p-4 border rounded-lg bg-white">Order #{o.id}</div>
          ))}
        </div>
      )}
    </div>
  );
}
