import React, { useState } from "react";
import { verifyOTP } from "../../services/authService";
import { useParams, useNavigate } from "react-router-dom";

export default function OTPPage() {
  const { email } = useParams();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await verifyOTP(email, otp);
      navigate(`/reset-password/${email}`);
    } catch (err) {
  const msg = err?.response?.data?.message || "Invalid OTP";
  setError(msg);
}

  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-white px-6">
      <div className="w-full max-w-md bg-white shadow-lg rounded-3xl p-10 border">

        <h1 className="text-3xl font-serif text-center mb-6">Enter OTP</h1>

        {error && <p className="text-red-500">{error}</p>}

        <form onSubmit={handleVerify} className="space-y-4">
          <input
            type="text"
            placeholder="6-digit OTP"
            className="w-full px-4 py-3 bg-gray-100 border rounded-xl"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            maxLength={6}
            required
          />

          <button className="w-full bg-black text-white py-3 rounded-xl">
            Verify OTP
          </button>
        </form>

      </div>
    </div>
  );
}
