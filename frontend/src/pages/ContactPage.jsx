import React, { useState } from "react";
import Navbar from "../components/layout/Navbar/Navbar";
import Footer from "../components/layout/Footer/footer";
import { sendContactMessage } from "../services/contactService";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await sendContactMessage(form);
      toast.success("Message sent successfully!");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to send message"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#f6f4ef] min-h-screen text-[#1a1816]">
    

      <div className="max-w-5xl mx-auto px-6 pt-32 pb-20">
        <h1 className="text-4xl font-semibold mb-4">Contact Us</h1>
        <p className="text-gray-700 mb-10 max-w-2xl">
          Have questions about products, AR preview, or orders?
          Reach out — we usually reply within 24 hours.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* INFO */}
          <div className="space-y-6">
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">arhomespace@gmail.com</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="font-medium">+91 98765 43210</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Address</p>
              <p className="font-medium">New Delhi, India</p>
            </div>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              className="w-full border rounded-lg px-4 py-3 bg-white"
              required
            />

            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your email"
              className="w-full border rounded-lg px-4 py-3 bg-white"
              required
            />

            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Your message"
              className="w-full border rounded-lg px-4 py-3 h-32 bg-white"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>

            {/* FAQ LINK */}
            <p className="text-sm text-gray-600 pt-2">
              Looking for quick answers?{" "}
              <Link
                to="/faq"
                className="underline hover:text-black"
              >
                Visit our FAQ
              </Link>
            </p>
          </form>
        </div>
      </div>

  
    </div>
  );
}
