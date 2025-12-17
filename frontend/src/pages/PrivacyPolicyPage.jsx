import React from "react";

export default function PrivacyPolicyPage() {
  return (
    <div className="pt-28 px-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6">Privacy Policy</h1>
      <p className="text-gray-700 leading-7 mb-4">
        Your privacy matters. This page describes how we collect, use, and protect your information.
      </p>
      <ul className="list-disc pl-6 text-gray-700 space-y-2">
        <li>We collect only necessary data for orders and support.</li>
        <li>We never sell your personal information.</li>
        <li>You can request data deletion at any time.</li>
      </ul>
    </div>
  );
}
