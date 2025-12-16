import React, { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../services/profileService";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const u = await getProfile();
        setUser(u);
      } catch {
        setUser(null);
      }
    };
    load();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const updated = await updateProfile({
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
        city: user.city,
        zipCode: user.zipCode,
        phoneNo: user.phoneNo,
      });
      setUser(updated);
    } finally {
      setSaving(false);
    }
  };

  if (!user) return <div className="pt-28 px-6">Loading...</div>;

  return (
    <div className="pt-28 px-6 mx-auto max-w-3xl">
      <h1 className="text-3xl font-semibold mb-6">My Profile</h1>

      <form onSubmit={handleSave} className="space-y-4 bg-white p-6 rounded-xl shadow">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm">First Name</label>
            <input name="firstName" value={user.firstName || ""} onChange={handleChange} className="w-full border p-2 rounded" />
          </div>
          <div>
            <label className="text-sm">Last Name</label>
            <input name="lastName" value={user.lastName || ""} onChange={handleChange} className="w-full border p-2 rounded" />
          </div>
          <div>
            <label className="text-sm">Email</label>
            <input value={user.email || ""} disabled className="w-full border p-2 rounded bg-gray-100" />
          </div>
          <div>
            <label className="text-sm">Phone</label>
            <input name="phoneNo" value={user.phoneNo || ""} onChange={handleChange} className="w-full border p-2 rounded" />
          </div>
          <div className="sm:col-span-2">
            <label className="text-sm">Address</label>
            <input name="address" value={user.address || ""} onChange={handleChange} className="w-full border p-2 rounded" />
          </div>
          <div>
            <label className="text-sm">City</label>
            <input name="city" value={user.city || ""} onChange={handleChange} className="w-full border p-2 rounded" />
          </div>
          <div>
            <label className="text-sm">ZIP</label>
            <input name="zipCode" value={user.zipCode || ""} onChange={handleChange} className="w-full border p-2 rounded" />
          </div>
        </div>

        <button disabled={saving} className="bg-black text-white px-4 py-2 rounded">
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
