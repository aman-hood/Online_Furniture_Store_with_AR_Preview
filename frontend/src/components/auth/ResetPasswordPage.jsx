import React, { useState } from "react";
import { resetPassword } from "../../services/authService";
import { useParams, useNavigate } from "react-router-dom";

export default function ResetPasswordPage() {
  const { email } = useParams();
  const navigate = useNavigate();

  const [newPass, setNewPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await resetPassword(email, newPass, confirm);
      navigate("/reset-success");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center px-6 bg-white">
      <div className="w-full max-w-md bg-white border shadow-lg rounded-3xl p-10">

        <h1 className="text-3xl font-serif text-center mb-6">Create New Password</h1>

        {error && <p className="text-red-500">{error}</p>}

        <form onSubmit={handleReset} className="space-y-4">
          <input
            type="password"
            placeholder="New Password"
            className="w-full px-4 py-3 bg-gray-100 border rounded-xl"
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full px-4 py-3 bg-gray-100 border rounded-xl"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />

          <button className="w-full bg-black text-white py-3 rounded-xl">
            Reset Password
          </button>
        </form>

      </div>
    </div>
  );
}
