import React from "react";

export default function ContactPage() {
  return (
    <div className="pt-30 px-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-semibold mb-4">Contact Us</h1>
      <p className="text-gray-700 mb-8">We'd love to hear from you. Reach out with any questions.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div>
            <div className="text-sm text-gray-500">Email</div>
            <div className="font-medium">support@funio.com</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Phone</div>
            <div className="font-medium">+91 98765 43210</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Address</div>
            <div className="font-medium">New Delhi, India</div>
          </div>
        </div>
        <form className="space-y-4">
          <input className="w-full border rounded-lg px-4 py-3" placeholder="Your name" />
          <input className="w-full border rounded-lg px-4 py-3" placeholder="Your email" />
          <textarea className="w-full border rounded-lg px-4 py-3 h-32" placeholder="Your message" />
          <button type="button" className="px-5 py-3 bg-black text-white rounded-lg">Send</button>
        </form>
      </div>
    </div>
  );
}
