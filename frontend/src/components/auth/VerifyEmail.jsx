import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function VerifyEmail() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("Verifying...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    verifyUser();
  }, []);

  const verifyUser = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/users/verify", {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.data.success) {
        setStatus("Email verified successfully!");
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (err) {
      const msg = err?.response?.data?.message || "Verification failed.";
      setStatus(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-10 bg-white shadow-xl rounded-2xl">
        <h1 className="text-3xl font-serif">Email Verification</h1>
        {loading ? (
          <p className="animate-pulse">Verifying...</p>
        ) : (
          <p>{status}</p>
        )}
      </div>
    </div>
  );
}
