import React from "react";
import chair from "/src/assets/login/chair.png";
import { Link } from "react-router-dom";

export default function LoginPage() {

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-8 py-9">
      <div className="max-w-[1200px] w-full grid grid-cols-12 gap-10 items-center">

        {/* LEFT IMAGE */}
        <div className="col-span-7 hidden lg:flex items-center justify-center shadow-[0_8px_40px_rgba(0,0,0,0.06)]">
          <div className="relative w-full h-[650px] rounded-2xl overflow-hidden shadow-2xl bg-[#f4f4f4]">
            <img
              src={chair}
              alt="Designer Furniture"
              className="absolute right-30 -bottom-10 w-[65%] object-contain drop-shadow-2xl animate-[float_4s_ease-in-out_infinite]"
            />
          </div>
        </div>

        {/* RIGHT LOGIN CARD */}
        <div className="col-span-12 lg:col-span-5 flex items-center justify-center">
          <div className="w-full max-w-md bg-white shadow-lg shadow-stone-300/60 border border-gray-200 rounded-3xl p-10">

            <div className="text-center mb-10">
              <h1 className="text-5xl font-serif text-[#111] tracking-wide">FUNIO</h1>
              <p className="mt-2 text-sm text-gray-500">Premium furniture for modern living</p>
            </div>

            <form className="space-y-6">

              <label className="block">
                <span className="text-xs text-gray-600">Email Address</span>
                <input
                  type="email"
                  placeholder="you@mail.com"
                  className="mt-2 w-full rounded-xl px-4 py-3 bg-[#f3f3f3] border border-gray-300"
                />
              </label>

              <label className="block">
                <span className="text-xs text-gray-600">Password</span>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="mt-2 w-full rounded-xl px-4 py-3 bg-[#f3f3f3] border border-gray-300"
                />
              </label>

              <div className="flex items-center justify-between text-sm text-gray-600">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4 accent-black" />
                  <span>Remember me</span>
                </label>

                  <Link to="/forgot-password" className="underline hover:text-black">
                  Forgot password?
                  </Link>
            
              </div>

              <button
                type="submit"
                className="w-full mt-2 rounded-xl py-3 font-semibold text-white bg-black"
              >
                LOG IN
              </button>

              {/* ❗ Updated navigation */}
              <div className="pt-4 text-center text-sm text-gray-600">
                <span>Don’t have an account?</span>
                <Link to="/signup" className="ml-2 underline hover:text-black">
                  Create one
                </Link>
              </div>

            </form>

            <div className="mt-10 flex items-center justify-center text-xs text-gray-500">
              © FUNIO • Scandinavian Living
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
