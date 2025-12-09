import React from "react";
import { useParams, Link } from "react-router-dom";

export default function VerifyPendingPage() {
  const { email } = useParams();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6">
      <div className="max-w-md w-full bg-white shadow-xl border rounded-3xl p-10 text-center">
        
        <h1 className="text-3xl font-serif mb-4">Verify Your Email</h1>
        
        <p className="text-gray-600 mb-4">
          You must verify your account before logging in.
        </p>

        <p className="text-sm text-gray-500 mb-6">
          A verification email has been sent to:
          <br />
          <strong>{email}</strong>
        </p>

        <Link
          to="/login"
          className="bg-black text-white px-6 py-3 rounded-xl"
        >
          Go to Login
        </Link>

      </div>
    </div>
  );
}
