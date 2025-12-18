import { useRef, useState } from "react";
import {
  updateProfile,
  uploadAvatar,
} from "../../../services/profileService";

export default function ProfileTab({ user, setUser }) {
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef(null);

  /* ---------------- AVATAR UPLOAD ---------------- */
  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // ✅ TYPE CHECK
    if (!file.type.startsWith("image/")) {
      alert("Only image files are allowed");
      e.target.value = null;
      return;
    }

    // ✅ SIZE CHECK (2MB)
    const MAX_SIZE = 2 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      alert("Image must be under 2MB");
      e.target.value = null;
      return;
    }

    setUploading(true);
    try {
      const updatedUser = await uploadAvatar(file);
      setUser(updatedUser);
    } catch {
      alert("Avatar upload failed");
    } finally {
      setUploading(false);
    }
  };

  /* ---------------- PROFILE UPDATE ---------------- */
  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const saveProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const updated = await updateProfile({
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNo: user.phoneNo,
      });
      setUser(updated);
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      {/* AVATAR */}
      <div className="flex items-center gap-6 mb-12">
        <div className="relative">
          <img
            src={user.avatar || "https://i.pravatar.cc/120"}
            alt="avatar"
            className="w-28 h-28 rounded-full object-cover"
          />

          <button
            type="button"
            onClick={() => fileRef.current.click()}
            className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-[#3f3a33] text-white text-xs flex items-center justify-center"
          >
            {uploading ? "…" : "✎"}
          </button>

          <input
            type="file"
            ref={fileRef}
            onChange={handleAvatarChange}
            accept="image/*"
            hidden
          />
        </div>
      </div>

      {/* FORM */}
      <form onSubmit={saveProfile} className="space-y-6 max-w-xl">
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

        <Field label="Email" value={user.email} disabled />

        <Field
          label="Phone"
          name="phoneNo"
          value={user.phoneNo}
          onChange={handleChange}
        />

        <button
          disabled={saving}
          className={`px-8 py-3 rounded-full text-sm transition
            ${
              saving
                ? "bg-[#e6e0d9] text-[#8a8177]"
                : "bg-[#3f3a33] text-white hover:bg-[#2f2a24]"
            }`}
        >
          {saving ? "Saving…" : "Update Changes"}
        </button>
      </form>
    </>
  );
}

/* ---------------- UI HELPERS ---------------- */

const Field = ({ label, name, value, onChange, disabled, type = "text" }) => (
  <div>
    <label className="text-sm text-[#6b6258] block mb-2">{label}</label>
    <input
      type={type}
      name={name}
      value={value || ""}
      onChange={onChange}
      disabled={disabled}
      className="w-full border border-[#e6e0d9] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#3f3a33]"
    />
  </div>
);

const TwoCol = ({ children }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{children}</div>
);
