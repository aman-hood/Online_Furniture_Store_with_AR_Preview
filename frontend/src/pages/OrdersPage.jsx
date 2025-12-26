import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

 useEffect(() => {
  fetch("http://localhost:3000/api/orders/my", {
    credentials: "include",
  })
    .then((res) => {
      if (!res.ok) throw new Error("Unauthorized");
      return res.json();
    })
    .then((data) => {
      setOrders(Array.isArray(data.orders) ? data.orders : []);
    })
    .catch(() => {
      setOrders([]);
    });
}, []);


  return (
    <section className="pt-32 px-6 bg-[#fbf9f6] min-h-screen">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-3xl font-medium text-[#3f3a33]">
            My Orders
          </h1>
          <p className="text-sm text-[#6b6258] mt-1">
            {orders.length} order{orders.length !== 1 && "s"}
          </p>
        </div>

        {orders.length === 0 ? (
          <p className="text-center text-[#6b6258] py-20">
            You haven’t placed any orders yet.
          </p>
        ) : (
          <div className="space-y-10">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-3xl p-6 shadow-[0_18px_45px_rgba(0,0,0,0.06)]"
              >
                {/* ORDER HEADER */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-2">
                  <div>
                    <p className="font-medium text-[#3f3a33]">
                      Order #{order.orderId}
                    </p>
                    <p className="text-sm text-[#6b6258]">
                      {new Date(order.createdAt).toDateString()}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-green-600">
                      {order.status}
                    </span>

                    <Link
                      to={`/track?orderId=${order.orderId}`}
                      className="text-sm underline text-[#3f3a33]"
                    >
                      Track
                    </Link>
                  </div>
                </div>

                {/* ORDER ITEMS (LIKE CART) */}
                <div className="space-y-4">
                  {order.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex gap-4 p-4 bg-[#fbf9f6] rounded-2xl"
                    >
                      {/* IMAGE */}
                      <img
                        src={
                          item.img
                            ? `http://localhost:3000${item.img}`
                            : "/images/placeholder.png"
                        }
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-xl"
                      />


                      {/* DETAILS */}
                      <div className="flex-1">
                        <p className="font-medium text-[#3f3a33]">
                          {item.name}
                        </p>

                        <p className="text-sm text-[#6b6258] mt-1">
                          Quantity: {item.quantity}
                        </p>

                        <p className="text-sm text-[#6b6258]">
                          ₹{item.price} × {item.quantity}
                        </p>
                      </div>

                      {/* PRICE */}
                      <div className="font-medium text-[#3f3a33]">
                        ₹{item.price * item.quantity}
                      </div>
                    </div>
                  ))}
                </div>

                {/* ORDER TOTAL */}
                <div className="mt-6 flex justify-between items-center border-t pt-4">
                  <span className="text-sm text-[#6b6258]">
                    Total
                  </span>
                  <span className="text-lg font-medium text-[#3f3a33]">
                    ₹{order.total}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
