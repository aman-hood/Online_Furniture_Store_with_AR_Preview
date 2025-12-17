import React from "react";

const GiftForm = ({ email, message, setEmail, setMessage }) => {
  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm text-[#6b6258] mb-2">
          Recipient Email
        </label>
        <input
          type="email"
          placeholder="someone@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="
            w-full rounded-xl px-4 py-3
            border border-gray-200
            focus:outline-none focus:border-gray-400
            text-sm
          "
        />
      </div>

      <div>
        <label className="block text-sm text-[#6b6258] mb-2">
          Gift Message (optional)
        </label>
        <textarea
          rows={4}
          maxLength={200}
          placeholder="Write a personal message…"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="
            w-full rounded-xl px-4 py-3
            border border-gray-200 resize-none
            focus:outline-none focus:border-gray-400
            text-sm
          "
        />
      </div>
    </div>
  );
};

export default GiftForm;
