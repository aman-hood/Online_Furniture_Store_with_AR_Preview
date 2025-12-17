import React from "react";

export default function SupportPage() {
  return (
    <div className="pt-28 px-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold mb-4">Support</h1>
      <p className="text-gray-700 mb-6">Need help? Visit our Help Center or contact support.</p>
      <ul className="list-disc pl-6 text-gray-700 space-y-2">
        <li>Help Center: common troubleshooting and guides</li>
        <li>Email: support@funio.com</li>
        <li>Phone: +91 98765 43210</li>
      </ul>
    </div>
  );
}
