import React, { useState } from "react";
import chair from "/src/assets/login/chair.png";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // IMPORTANT — sends cookies
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success) {
        navigate("/"); // user now logged in via cookie
      } else if (data.code === "EMAIL_NOT_VERIFIED") {
      navigate(`/verify-pending/${email}`);
    } else {
        setError(data.message || "Login failed");
      }

    } catch (err) {
      setError("Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

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

            <div className="text-center mb-6">
              <h1 className="text-5xl font-serif text-[#111] tracking-wide">FUNIO</h1>
              <p className="mt-2 text-sm text-gray-500">Premium furniture for modern living</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">

              {error && (
                <div className="p-3 rounded-lg bg-red-100 text-red-700 text-sm">
                  {error}
                </div>
              )}

              <label className="block">
                <span className="text-xs text-gray-600">Email Address</span>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="you@mail.com"
                  className="mt-2 w-full rounded-xl px-4 py-3 bg-[#f3f3f3] border border-gray-300"
                  required
                />
              </label>

              <label className="block">
                <span className="text-xs text-gray-600">Password</span>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="••••••••"
                  className="mt-2 w-full rounded-xl px-4 py-3 bg-[#f3f3f3] border border-gray-300"
                  required
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
                disabled={loading}
                className={`w-full mt-2 rounded-xl py-3 font-semibold text-white transition 
                  ${loading ? "bg-gray-600 cursor-not-allowed" : "bg-black hover:bg-gray-900"}`}
              >
                {loading ? "Signing in…" : "LOG IN"}
              </button>

              <div className="pt-4 text-center text-sm text-gray-600">
                <span>Don’t have an account?</span>
                <Link to="/signup" className="ml-2 underline hover:text-black">
                  Create one
                </Link>
              </div>

            </form>

            <div className="mt-8 flex items-center justify-center text-xs text-gray-500">
              © FUNIO • Scandinavian Living
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
