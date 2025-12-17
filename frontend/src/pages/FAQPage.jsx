import React from "react";

export default function FAQPage() {
  const faqs = [
    { q: "How long does shipping take?", a: "Typically 5-7 business days depending on your location." },
    { q: "What is your return policy?", a: "Returns accepted within 30 days in original condition." },
    { q: "Do you offer assembly?", a: "Yes, at checkout you can select assembly as an add-on in select cities." },
  ];

  return (
    <div className="pt-28 px-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6">Frequently Asked Questions</h1>
      <div className="divide-y">
        {faqs.map((f, i) => (
          <div key={i} className="py-4">
            <div className="font-medium">{f.q}</div>
            <div className="text-gray-700 mt-1">{f.a}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
