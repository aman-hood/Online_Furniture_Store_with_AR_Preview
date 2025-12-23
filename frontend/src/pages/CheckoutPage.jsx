import { useEffect, useState } from "react";
import { getCart } from "../services/cartService";

export default function CheckoutPage() {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    const load = async () => {
      const c = await getCart();
      setCart(c);
    };
    load();
  }, []);

  if (!cart || cart.items.length === 0)
    return <p className="pt-40 text-center">Cart is empty</p>;

  const stockIssue = cart.items.some(
    (i) => i.quantity > i.product.stock
  );

  const total = cart.items.reduce(
    (s, i) => s + i.product.price * i.quantity,
    0
  );

  return (
    <div className="max-w-4xl mx-auto pt-32 px-6">
      <h1 className="text-3xl font-semibold mb-6">Checkout</h1>

      {cart.items.map((i) => (
        <div key={i.product._id} className="flex justify-between py-3">
          <span>
            {i.product.name} × {i.quantity}
          </span>
          <span>₹{i.product.price * i.quantity}</span>
        </div>
      ))}

      <div className="mt-6 text-xl font-semibold">
        Total: ₹{total}
      </div>

      {stockIssue && (
        <p className="text-red-600 mt-4">
          Stock changed. Please update cart.
        </p>
      )}

      <button
        disabled={stockIssue}
        className={`mt-6 px-8 py-3 rounded text-white ${
          stockIssue
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-black hover:bg-gray-800"
        }`}
      >
        Place Order
      </button>
    </div>
  );
}
