import React from "react";
import { Link } from "react-router-dom";

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-gray-200 p-10">

        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-serif text-[#111] tracking-tight">
            Forgot Password
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            No worries — we’ll send you a reset link.
          </p>
        </div>

        {/* FORM */}
        <form className="space-y-6">

          {/* Email */}
          <div>
            <label className="text-xs text-gray-600">Email Address</label>
            <input
              type="email"
              placeholder="you@mail.com"
              className="
                mt-2 w-full rounded-2xl px-4 py-3 bg-[#f5f5f5]
                border border-gray-300 focus:outline-none 
                focus:ring-2 focus:ring-black
                placeholder-gray-400 text-[#111]
              "
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="
              w-full rounded-2xl py-3 font-semibold text-white 
              bg-black hover:bg-[#222] transition shadow-md hover:shadow-lg
            "
          >
            Send Reset Link
          </button>
        </form>

        {/* Go back */}
        <div className="pt-6 text-center text-sm text-gray-600">
          Remember your password?
          <Link to="/login" className="ml-2 underline hover:text-black">
            Back to Login
          </Link>
        </div>

      </div>
    </div>
  );
}
