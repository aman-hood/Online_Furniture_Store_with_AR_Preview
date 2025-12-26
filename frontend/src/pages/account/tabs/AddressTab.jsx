import { useState } from "react";
import { updateAddress } from "../../../services/profileService";

export default function AddressTab({ user, setUser }) {
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const saveAddress = async () => {
    setSaving(true);

    const updated = await updateAddress({
      address: user.address,
      city: user.city,
      zipCode: user.zipCode,
    });

    setUser(updated);
    setSaving(false);
  };

  return (
    <div className="space-y-6 max-w-lg">
      <Field label="Street Address" name="address" value={user.address} onChange={handleChange} />
      <Field label="City" name="city" value={user.city} onChange={handleChange} />
      <Field label="ZIP Code" name="zipCode" value={user.zipCode} onChange={handleChange} />

      <button
        onClick={saveAddress}
        disabled={saving}
        className="px-8 py-3 rounded-full bg-[#3f3a33] text-white"
      >
        {saving ? "Saving…" : "Save Address"}
      </button>
    </div>
  );
}

const Field = ({ label, name, value, onChange }) => (
  <div>
    <label className="text-sm text-[#6b6258] block mb-2">{label}</label>
    <input
      name={name}
      value={value || ""}
      onChange={onChange}
      className="w-full border border-[#e6e0d9] rounded-xl px-4 py-3"
    />
  </div>
);
