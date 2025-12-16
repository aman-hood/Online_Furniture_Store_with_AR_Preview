import React, { useEffect, useState } from "react";
import { getCart, removeFromCart, updateCartItem, clearCart } from "../services/cartService";

export default function CartPage() {
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const c = await getCart();
      setCart(c || { items: [] });
    } catch {
      setCart({ items: [] });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleQty = async (productId, qty) => {
    await updateCartItem(productId, qty);
    load();
  };

  const handleRemove = async (productId) => {
    await removeFromCart(productId);
    load();
  };

  const handleClear = async () => {
    await clearCart();
    load();
  };

  const total = (cart.items || []).reduce((sum, it) => sum + (it.product?.price || 0) * it.quantity, 0);

  return (
    <div className="pt-28 px-6 mx-auto max-w-5xl">
      <h1 className="text-3xl font-semibold mb-6">My Cart</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="space-y-5">
            {(cart.items || []).map((it) => (
              <div key={it.product?._id} className="flex items-center gap-4 border p-4 rounded-xl bg-white">
                <img src={it.product?.imageUrl} alt={it.product?.name} className="w-24 h-24 object-cover rounded-lg" />
                <div className="flex-1">
                  <p className="font-medium">{it.product?.name}</p>
                  <p className="text-sm text-gray-600">₹{it.product?.price}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <button className="px-2 border" onClick={() => handleQty(it.product._id, Math.max(1, it.quantity - 1))}>-</button>
                    <span>{it.quantity}</span>
                    <button className="px-2 border" onClick={() => handleQty(it.product._id, it.quantity + 1)}>+</button>
                    <button className="ml-4 text-red-600" onClick={() => handleRemove(it.product._id)}>Remove</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between">
            <button className="border px-4 py-2 rounded-lg" onClick={handleClear}>Clear Cart</button>
            <div className="text-xl font-semibold">Total: ₹{total}</div>
          </div>
        </>
      )}
    </div>
  );
}
