import React, { useEffect, useRef, useState } from "react";
import {
  getProfile,
  updateProfile,
  uploadAvatar,
  logoutUser,
} from "../services/profileService";
import { useNavigate } from "react-router-dom";

const TABS = {
  PROFILE: "profile",
  ORDERS: "orders",
  ADDRESS: "address",
  PASSWORD: "password",
};

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState(TABS.PROFILE);
  const [user, setUser] = useState(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    getProfile().then(setUser);
  }, []);

  /* ---------------- LOGOUT ---------------- */
  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/login"); // redirect after logout
    } catch {
      alert("Logout failed. Try again.");
    }
  };

  /* ---------------- AVATAR UPLOAD ---------------- */
  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

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

  if (!user) {
    return (
      <div className="min-h-screen bg-[#fbf9f6] flex items-center justify-center text-[#8a8177]">
        Loading account…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fbf9f6]">

      {/* HEADER */}
      <div className="pt-32 pb-16 text-center">
        <h1 className="text-[38px] font-medium text-[#3f3a33]">
          My Account
        </h1>
        <p className="text-sm text-[#8a8177] mt-2">
          Home / <span className="text-[#3f3a33]">My Account</span>
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-32 grid grid-cols-1 lg:grid-cols-4 gap-12">

        {/* SIDEBAR */}
        <aside className="bg-white rounded-2xl border border-[#eee9e2] h-fit">
          <Sidebar label="Personal Information" active={activeTab === TABS.PROFILE} onClick={() => setActiveTab(TABS.PROFILE)} />
          <Sidebar label="My Orders" active={activeTab === TABS.ORDERS} onClick={() => setActiveTab(TABS.ORDERS)} />
          <Sidebar label="Manage Address" active={activeTab === TABS.ADDRESS} onClick={() => setActiveTab(TABS.ADDRESS)} />
          <Sidebar label="Password Manager" active={activeTab === TABS.PASSWORD} onClick={() => setActiveTab(TABS.PASSWORD)} />
          <Sidebar label="Logout" danger onClick={handleLogout} />
        </aside>

        {/* CONTENT */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-[#eee9e2] p-10">

          {activeTab === TABS.PROFILE && (
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

              <PersonalInfo user={user} setUser={setUser} saving={saving} setSaving={setSaving} />
            </>
          )}

          {activeTab === TABS.ORDERS && <Orders />}
          {activeTab === TABS.ADDRESS && <Address user={user} setUser={setUser} saving={saving} setSaving={setSaving} />}
          {activeTab === TABS.PASSWORD && <Password />}
        </div>
      </div>
    </div>
  );
}

/* ---------------- SIDEBAR ---------------- */
const Sidebar = ({ label, active, onClick, danger }) => (
  <button
    onClick={onClick}
    className={`w-full text-left px-6 py-4 text-sm border-b transition
      ${
        danger
          ? "text-red-600 hover:bg-red-50"
          : active
          ? "bg-[#f4efe9] text-[#3f3a33] font-medium"
          : "text-[#6b6258] hover:bg-[#faf8f5]"
      }`}
  >
    {label}
  </button>
);

/* ---------------- PERSONAL INFO ---------------- */
const PersonalInfo = ({ user, setUser, saving, setSaving }) => {
  const handleChange = (e) =>
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const save = async (e) => {
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
    <form onSubmit={save} className="space-y-6">
      <TwoCol>
        <Field label="First Name" name="firstName" value={user.firstName} onChange={handleChange} />
        <Field label="Last Name" name="lastName" value={user.lastName} onChange={handleChange} />
      </TwoCol>

      <Field label="Email" value={user.email} disabled />
      <Field label="Phone" name="phoneNo" value={user.phoneNo} onChange={handleChange} />

      <button
        disabled={saving}
        className={`px-8 py-3 rounded-full text-sm
          ${saving ? "bg-[#e6e0d9]" : "bg-[#3f3a33] text-white hover:bg-[#2f2a24]"}`}
      >
        {saving ? "Saving…" : "Update Changes"}
      </button>
    </form>
  );
};

/* ---------------- OTHER TABS ---------------- */
const Orders = () => <p className="text-[#6b6258]">No orders yet.</p>;

const Address = ({ user, setUser, saving, setSaving }) => {
  const handleChange = (e) =>
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const save = async () => {
    setSaving(true);
    const updated = await updateProfile({
      address: user.address,
      city: user.city,
      zipCode: user.zipCode,
    });
    setUser(updated);
    setSaving(false);
  };

  return (
    <div className="space-y-6 ">
      <Field label="Street Address" name="address" value={user.address} onChange={handleChange} />
      <TwoCol>
        <Field label="City" name="city" value={user.city} onChange={handleChange} />
        <Field label="ZIP Code" name="zipCode" value={user.zipCode} onChange={handleChange} />
      </TwoCol>

      <button onClick={save} className="px-8 py-3 rounded-full bg-[#3f3a33] text-white">
        Save Address
      </button>
    </div>
  );
};

const Password = () => (
  <div className="space-y-6">
    <Field label="Current Password" type="password" />
    <Field label="New Password" type="password" />
    <Field label="Confirm Password" type="password" />
    <button className="px-8 py-3 rounded-full bg-[#3f3a33] text-white">
      Change Password
    </button>
  </div>
);

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
      className="w-full border border-[#e6e0d9] rounded-xl px-4 py-3 text-sm"
    />
  </div>
);

const TwoCol = ({ children }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{children}</div>
);
