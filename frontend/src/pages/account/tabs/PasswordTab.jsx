import { useState } from "react";

export default function PasswordTab({ user }) {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const changePassword = async () => {
  if (form.newPassword !== form.confirmPassword) {
    return alert("Passwords do not match");
  }

  setSaving(true);

  try {
    const res = await fetch(
      "http://localhost:3000/api/users/change-password",
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          currentPassword: form.currentPassword,
          newPassword: form.newPassword,
        }),
      }
    );

    const data = await res.json();

    if (!res.ok || !data.success) {
      throw new Error(data.message || "Password update failed");
    }

    // ✅ SUCCESS FLOW (ONLY ONCE)
    alert("Password updated successfully. Please log in again.");

    // logout user
    await fetch("http://localhost:3000/api/users/logout", {
      method: "POST",
      credentials: "include",
    });

    // redirect to login
    window.location.href = "/login";
  } catch (err) {
    console.error("PASSWORD ERROR:", err);
    alert(err.message);
  } finally {
    setSaving(false);
  }
};



  return (
    <div className="space-y-6 max-w-md">

  {/* 🔐 CURRENT PASSWORD */}
  <Field
    label="Current Password"
    name="currentPassword"
    type="password"
    value={form.currentPassword}
    onChange={handleChange}
  />

  {/* 🔐 NEW PASSWORD */}
  <Field
    label="New Password"
    name="newPassword"
    type="password"
    value={form.newPassword}
    onChange={handleChange}
  />

  {/* 🔐 CONFIRM PASSWORD */}
  <Field
    label="Confirm Password"
    name="confirmPassword"
    type="password"
    value={form.confirmPassword}
    onChange={handleChange}
  />

  <button
    onClick={changePassword}
    disabled={saving}
    className="px-8 py-3 rounded-full bg-[#3f3a33] text-white"
  >
    {saving ? "Updating…" : "Change Password"}
  </button>
</div>

  );
}

const Field = ({ label, name, value, onChange, type }) => (
  <div>
    <label className="text-sm text-[#6b6258] block mb-2">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full border rounded-xl px-4 py-3"
    />
  </div>
);
