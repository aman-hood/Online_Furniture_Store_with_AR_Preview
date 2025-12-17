import React from "react";

export default function TermsPage() {
  return (
    <div className="pt-28 px-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6">Terms of Use</h1>
      <p className="text-gray-700 leading-7 mb-4">
        These terms govern your use of our website and services. By using this site, you agree
        to comply with these terms and all applicable laws and regulations.
      </p>
      <ul className="list-disc pl-6 text-gray-700 space-y-2">
        <li>Use the site for lawful purposes only.</li>
        <li>Do not misuse, disrupt, or attempt to gain unauthorized access.</li>
        <li>Content and pricing may change without notice.</li>
      </ul>
    </div>
  );
}
