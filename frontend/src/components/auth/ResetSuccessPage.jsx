import React from "react";
import { Link } from "react-router-dom";

export default function ResetSuccessPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white">
      <h1 className="text-4xl font-serif mb-4">Password Reset Successful</h1>
      <p className="text-gray-600 mb-6">You can now login with your new password.</p>

      <Link
        to="/login"
        className="bg-black text-white px-6 py-3 rounded-xl"
      >
        Go to Login
      </Link>
    </div>
  );
}
