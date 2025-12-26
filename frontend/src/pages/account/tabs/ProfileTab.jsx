import { useState } from "react";
import { updateProfile } from "../../../services/profileService";

export default function ProfileTab({ user, setUser }) {
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const saveProfile = async (e) => {
    e.preventDefault();
    setSaving(true);

    const updated = await updateProfile({
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNo: user.phoneNo,
    });

    setUser(updated);
    setSaving(false);
  };

  return (
    <form onSubmit={saveProfile} className="space-y-6 max-w-xl">

      {/* INITIALS AVATAR */}
      <div className="w-24 h-24 rounded-full bg-black text-white flex items-center justify-center text-3xl font-semibold mb-8">
        {user.firstName[0]}
        {user.lastName[0]}
      </div>

      <TwoCol>
        <Field
          label="First Name"
          name="firstName"
          value={user.firstName}
          onChange={handleChange}
        />
        <Field
          label="Last Name"
          name="lastName"
          value={user.lastName}
          onChange={handleChange}
        />
      </TwoCol>

      {/* EMAIL (READ ONLY) */}
      <Field label="Email" value={user.email} disabled />

      <Field
        label="Phone"
        name="phoneNo"
        value={user.phoneNo}
        onChange={handleChange}
      />

      <button
        disabled={saving}
        className="px-8 py-3 rounded-full bg-[#3f3a33] text-white"
      >
        {saving ? "Saving…" : "Update Changes"}
      </button>
    </form>
  );
}

/* ---------- UI HELPERS ---------- */

const Field = ({ label, name, value, onChange, disabled }) => (
  <div>
    <label className="text-sm text-[#6b6258] block mb-2">{label}</label>
    <input
      name={name}
      value={value || ""}
      onChange={onChange}
      disabled={disabled}
      className="w-full border border-[#e6e0d9] rounded-xl px-4 py-3"
    />
  </div>
);

const TwoCol = ({ children }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{children}</div>
);
