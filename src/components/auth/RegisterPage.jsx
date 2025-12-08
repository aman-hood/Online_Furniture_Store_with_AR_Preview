import React from "react";
// import chair from "/src/assets/login/chair.png";
import { Link } from "react-router-dom";


export default function SignupPage() {

  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl border border-gray-200 p-10">

        {/* Top Hero Icon / Image */}
        {/* <div className="w-full flex justify-center mb-8">
          <div className="relative w-40 h-40 rounded-2xl overflow-hidden bg-[#f3f3f3] shadow-md">
            <img
              src={chair}
              alt="Furniture"
              className="w-full h-full object-contain animate-float"
            />
          </div>
        </div> */}

        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-serif text-[#111] tracking-tight">
            Join FUNIO
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Create an account to explore luxury living
          </p>
        </div>

        {/* SIGNUP FORM */}
        <form className="space-y-6">

          {/* Name */}
          <div>
            <label className="text-xs text-gray-600">Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              className="
                mt-2 w-full rounded-2xl px-4 py-3 bg-[#f5f5f5]
                border border-gray-300 focus:outline-none 
                focus:ring-2 focus:ring-black
                placeholder-gray-400 text-[#111]
              "
            />
          </div>

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

          {/* Password */}
          <div>
            <label className="text-xs text-gray-600">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="
                mt-2 w-full rounded-2xl px-4 py-3 bg-[#f5f5f5]
                border border-gray-300 focus:outline-none 
                focus:ring-2 focus:ring-black
                placeholder-gray-400 text-[#111]
              "
            />
          </div>

          {/* Confirm */}
          <div>
            <label className="text-xs text-gray-600">Confirm Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="
                mt-2 w-full rounded-2xl px-4 py-3 bg-[#f5f5f5]
                border border-gray-300 focus:outline-none 
                focus:ring-2 focus:ring-black
                placeholder-gray-400 text-[#111]
              "
            />
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            className="
              w-full rounded-2xl py-3 font-semibold text-white 
              bg-black hover:bg-[#222] transition shadow-md hover:shadow-lg
            "
          >
            Create Account
          </button>
        </form>

        {/* Already have account */}
        <div className="pt-6 text-center text-sm text-gray-600">
          Already have an account?
          <Link to="/login" className="ml-2 underline hover:text-black">
          Log in
          </Link>
        </div>
      </div>
    </div>
  );
}
