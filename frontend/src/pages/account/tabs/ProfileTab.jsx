import { useRef, useState } from "react";
import { updateProfile, uploadAvatar } from "../../../services/profileService";

export default function ProfileTab({ user, setUser }) {
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef(null);

  const handleAvatar = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const updated = await uploadAvatar(file);
    setUser(updated);
    setUploading(false);
  };

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
    <>
      <div className="flex items-center gap-6 mb-12">
        <div className="relative">
          <img
            src={user.avatar || "https://i.pravatar.cc/120"}
            className="w-28 h-28 rounded-full object-cover"
          />
          <button
            onClick={() => fileRef.current.click()}
            className="absolute bottom-2 right-2 w-8 h-8 bg-[#3f3a33] text-white rounded-full text-xs"
          >
            {uploading ? "…" : "✎"}
          </button>
          <input type="file" hidden ref={fileRef} onChange={handleAvatar} />
        </div>
      </div>

      <form onSubmit={save} className="space-y-6">
        <Input label="First Name" value={user.firstName} onChange={v => setUser({ ...user, firstName: v })} />
        <Input label="Last Name" value={user.lastName} onChange={v => setUser({ ...user, lastName: v })} />
        <Input label="Email" value={user.email} disabled />
        <Input label="Phone" value={user.phoneNo} onChange={v => setUser({ ...user, phoneNo: v })} />

        <button className="px-8 py-3 rounded-full bg-[#3f3a33] text-white">
          {saving ? "Saving…" : "Update Changes"}
        </button>
      </form>
    </>
  );
}

const Input = ({ label, value, onChange, disabled }) => (
  <div>
    <label className="text-sm text-[#6b6258]">{label}</label>
    <input
      value={value || ""}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border rounded-xl px-4 py-3"
    />
  </div>
);
