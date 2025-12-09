// src/components/auth/RegisterPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/authService";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName]   = useState("");
  const [email, setEmail]         = useState("");
  const [password, setPassword]   = useState("");
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await registerUser({ firstName, lastName, email, password });
      // backend returns newUser + token etc.
      alert(res?.message || "Registered — check your email for verification");
      navigate("/login");
    } catch (err) {
      console.error(err);
      const msg = err?.response?.data?.message || err.message || "Signup failed";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl border border-gray-200 p-10">

        <div className="text-center mb-6">
          <h1 className="text-4xl font-serif text-[#111] tracking-tight">Join FUNIO</h1>
          <p className="mt-2 text-sm text-gray-500">Create an account to explore luxury living</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          {error && <div className="text-sm text-red-600">{error}</div>}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First name"
              className="rounded-2xl px-4 py-3 bg-[#f5f5f5] border border-gray-300"
              required
            />
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last name"
              className="rounded-2xl px-4 py-3 bg-[#f5f5f5] border border-gray-300"
              required
            />
          </div>

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="you@mail.com"
            className="w-full rounded-2xl px-4 py-3 bg-[#f5f5f5] border border-gray-300"
            required
          />

          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="••••••••"
            className="w-full rounded-2xl px-4 py-3 bg-[#f5f5f5] border border-gray-300"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full rounded-2xl py-3 font-semibold text-white ${loading ? "bg-gray-700" : "bg-black"}`}
          >
            {loading ? "Creating…" : "Create Account"}
          </button>
        </form>

        <div className="pt-6 text-center text-sm text-gray-600">
          Already have an account?
          <button onClick={() => navigate("/login")} className="ml-2 underline hover:text-black">Log in</button>
        </div>
      </div>
    </div>
  );
}
