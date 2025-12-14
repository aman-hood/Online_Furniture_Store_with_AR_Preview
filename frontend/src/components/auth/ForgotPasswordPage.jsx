import React, { useState } from "react";
import { forgotPassword } from "../../services/authService";
import { useNavigate } from "react-router-dom";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await forgotPassword(email); // CALL BACKEND
      navigate(`/otp/${email}`);  // GO TO OTP PAGE
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-white px-6">
      <div className="w-full max-w-md bg-white shadow-lg rounded-3xl p-10 border border-gray-200">

        <h1 className="text-3xl font-serif text-center mb-6">Reset Password</h1>

        {error && <p className="text-red-500 mb-3">{error}</p>}

        <form onSubmit={handleSendOTP} className="space-y-4">

          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-3 bg-gray-100 rounded-xl border"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-xl"
          >
            Send OTP
          </button>

        </form>

      </div>
    </div>
  );
}
