import React, { useState } from "react";
import { reVerifyEmail } from "../../services/authService";

export default function VerifyPendingPage() {
  const email = window.location.pathname.split("/").pop();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResend = async () => {
    setLoading(true);
    try {
      await reVerifyEmail(email);
      setMessage("Verification email sent again!");
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="shadow-lg p-8 rounded-xl bg-white">
        <h1 className="text-2xl mb-3 font-semibold">Verify Your Email</h1>
        <p className="mb-5">Verification link sent to: <b>{email}</b></p>

        <button
          className="bg-black text-white px-4 py-2 rounded-lg"
          onClick={handleResend}
        >
          {loading ? "Sending..." : "Resend Email"}
        </button>

        {message && <p className="mt-4 text-green-600">{message}</p>}
      </div>
    </div>
  );
}
