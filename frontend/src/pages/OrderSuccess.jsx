import { Link, useLocation } from "react-router-dom";

export default function OrderSuccess() {
  const { state } = useLocation();

  // ✅ SAFE FALLBACK (no blank page)
  if (!state) {
    return (
      <section className="min-h-screen pt-32 px-6 bg-[#fbf9f6] text-center">
        <h1 className="text-3xl font-medium text-[#3f3a33] mb-4">
          Order Completed
        </h1>

        <p className="text-[#6b6258] mb-8">
          Your order has already been placed.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            to="/orders"
            className="px-6 py-3 rounded-full bg-[#3f3a33] text-white"
          >
            View Orders
          </Link>

          <Link
            to="/"
            className="px-6 py-3 rounded-full border border-[#3f3a33]"
          >
            Continue Shopping
          </Link>
        </div>
      </section>
    );
  }

  // ✅ NORMAL SUCCESS FLOW
  return (
    <section className="min-h-screen pt-32 px-6 bg-[#fbf9f6] text-center">
      <h1 className="text-3xl font-medium text-[#3f3a33] mb-4">
        Order Placed Successfully 🎉
      </h1>

      <p className="text-[#6b6258] mb-8">
        Thank you for your purchase.
      </p>

      <div className="flex justify-center gap-4">
        <Link
          to="/orders"
          className="px-6 py-3 rounded-full bg-[#3f3a33] text-white"
        >
          View Orders
        </Link>

        <Link
          to="/track"
          className="px-6 py-3 rounded-full border border-[#3f3a33]"
        >
          Track Order
        </Link>
      </div>
    </section>
  );
}
