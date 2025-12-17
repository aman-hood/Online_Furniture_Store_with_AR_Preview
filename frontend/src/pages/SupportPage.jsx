import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiMessageCircle, FiX } from "react-icons/fi";

const SupportPage = () => {
  const [orderId, setOrderId] = useState("");
  const [orderResult, setOrderResult] = useState(null);
  const [loadingOrder, setLoadingOrder] = useState(false);

  const [message, setMessage] = useState("");
  const [toast, setToast] = useState(null);

  const [chatOpen, setChatOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  /* -------------------------
     PAGE ENTRANCE (SUBTLE)
  ------------------------- */
  useEffect(() => {
    setMounted(true);
  }, []);

  /* -------------------------
     TOAST AUTO HIDE
  ------------------------- */
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  /* -------------------------
     ORDER LOOKUP (BACKEND READY)
  ------------------------- */
  const handleOrderLookup = async (e) => {
    e.preventDefault();
    if (!orderId.trim()) return;

    try {
      setLoadingOrder(true);
      setOrderResult(null);

      const res = await axios.get(
        `http://localhost:3000/api/orders/${orderId}`,
        { withCredentials: true }
      );

      setOrderResult(res.data.order);
      setToast({ type: "success", text: "Order found successfully" });
    } catch {
      setToast({ type: "error", text: "Order not found" });
    } finally {
      setLoadingOrder(false);
    }
  };

  /* -------------------------
     CONTACT FORM (UI ONLY)
  ------------------------- */
  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setToast({ type: "success", text: "Message sent to support" });
    setMessage("");
  };

  return (
    <>
      {/* TOAST */}
      {toast && (
        <div
          className={`
            fixed top-6 right-6 z-50
            px-6 py-3 rounded-full text-sm
            text-white shadow-lg
            ${
              toast.type === "success"
                ? "bg-[#3f3a33]"
                : "bg-red-500"
            }
          `}
        >
          {toast.text}
        </div>
      )}

      {/* PAGE */}
      <section
        className={`
          bg-[#fbf9f6] min-h-screen pt-15 pb-32 px-6
          transition-all duration-700
          ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
        `}
      >
        <div className="max-w-6xl mx-auto">

          {/* HERO */}
          <div className="max-w-3xl mb-24">
            <p className="uppercase text-[11px] tracking-[0.35em] text-[#8a8177] mb-6">
              Support
            </p>

            <h1 className="text-[40px] sm:text-[46px] font-medium text-[#3f3a33] leading-tight mb-6">
              How can we help you today?
            </h1>

            <p className="text-[15px] text-[#6b6258] leading-relaxed">
              Track orders, contact support, or get instant help from our team.
            </p>
          </div>

          {/* MAIN GRID (BALANCED) */}
          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-20">

            {/* LEFT COLUMN */}
            <div className="space-y-16">

              {/* ORDER LOOKUP */}
              <div className="bg-white rounded-3xl p-10 shadow-[0_25px_70px_rgba(0,0,0,0.06)]">
                <h2 className="text-xl font-medium text-[#3f3a33] mb-4">
                  Track your order
                </h2>

                <p className="text-sm text-[#6b6258] mb-8">
                  Enter your order ID to view the latest status.
                </p>

                <form onSubmit={handleOrderLookup} className="flex gap-4">
                  <input
                    type="text"
                    placeholder="Order ID (HS-XXXX)"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    className="
                      flex-1 rounded-full px-5 py-3
                      border border-[#ddd6cc]
                      text-sm
                      focus:outline-none focus:border-[#3f3a33]
                    "
                  />

                  <button
                    disabled={loadingOrder}
                    className="
                      px-6 py-3 rounded-full
                      bg-[#3f3a33] text-white text-sm
                      hover:bg-[#2f2a25]
                      active:scale-[0.98]
                      transition
                    "
                  >
                    {loadingOrder ? "Checking…" : "Track"}
                  </button>
                </form>

                {orderResult && (
                  <div className="mt-6 text-sm text-[#6b6258]">
                    Status: <strong>{orderResult.status}</strong>
                  </div>
                )}
              </div>

              {/* DIVIDER */}
              <p className="text-xs uppercase tracking-widest text-[#8a8177] text-center">
                or
              </p>

              {/* CONTACT FORM */}
              <div className="bg-white rounded-3xl p-10 shadow-[0_25px_70px_rgba(0,0,0,0.06)]">
                <h2 className="text-xl font-medium text-[#3f3a33] mb-4">
                  Contact support
                </h2>

                <p className="text-sm text-[#6b6258] mb-8">
                  Prefer to write to us? We usually respond within 24 hours.
                </p>

                <form onSubmit={handleContactSubmit} className="space-y-5">
                  <textarea
                    rows={4}
                    placeholder="How can we help you?"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="
                      w-full rounded-xl px-4 py-3
                      border border-[#ddd6cc]
                      text-sm resize-none
                      focus:outline-none focus:border-[#3f3a33]
                    "
                  />

                  <button
                    type="submit"
                    className="
                      px-8 py-3 rounded-full
                      bg-[#3f3a33] text-white text-sm
                      hover:bg-[#2f2a25]
                      active:scale-[0.98]
                      transition
                    "
                  >
                    Send message →
                  </button>
                </form>
              </div>
            </div>

            {/* RIGHT COLUMN (SUPPORT INFO CARD) */}
            <div className="bg-white rounded-3xl p-12 shadow-[0_25px_70px_rgba(0,0,0,0.06)] h-fit">
              <h3 className="text-xl font-medium text-[#3f3a33] mb-6">
                Support availability
              </h3>

              <div className="space-y-4 text-sm text-[#6b6258]">
                <p>
                  <span className="text-[#8a8177]">Email</span><br />
                  support@homespace.com
                </p>

                <p>
                  <span className="text-[#8a8177]">Phone</span><br />
                  +91 98765 43210
                </p>

                <p>
                  <span className="text-[#8a8177]">Hours</span><br />
                  Mon–Fri · 9 AM – 6 PM
                </p>
              </div>
            </div>
          </div>

          {/* FOOT NOTE */}
          <p className="text-center text-sm text-[#8a8177] mt-24">
            Homespace Support · Crafted with care
          </p>
        </div>
      </section>

      {/* LIVE CHAT INVITE */}
      <p className="fixed bottom-24 right-10 text-xs text-[#6b6258]">
        Need instant help?
      </p>

      {/* CHAT BUTTON */}
      <button
        onClick={() => setChatOpen(true)}
        className="
          fixed bottom-8 right-8 z-50
          w-14 h-14 rounded-full
          bg-[#3f3a33] text-white
          flex items-center justify-center
          shadow-lg
          hover:scale-105
          transition
        "
      >
        <FiMessageCircle size={22} />
      </button>

      {/* CHAT WINDOW */}
      {chatOpen && (
        <div className="fixed bottom-24 right-8 w-80 bg-white rounded-2xl shadow-xl z-50">
          <div className="flex justify-between items-center px-4 py-3 border-b">
            <p className="text-sm font-medium">Live Chat</p>
            <button onClick={() => setChatOpen(false)}>
              <FiX />
            </button>
          </div>
          <div className="p-4 text-sm text-[#6b6258]">
            Chat support coming soon.
          </div>
        </div>
      )}
    </>
  );
};

export default SupportPage;
