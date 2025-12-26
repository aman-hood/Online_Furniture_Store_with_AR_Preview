import { useEffect, useState } from "react";
import {
  getProfile,
  updateProfile,
  updateAddress,
  changePassword,
  logoutUser,
} from "../services/profileService";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getProfile().then(setUser);
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto pt-32 space-y-10">

      {/* PROFILE HEADER */}
      <div className="flex items-center gap-6">
        <div className="w-20 h-20 rounded-full bg-black text-white flex items-center justify-center text-2xl font-bold">
          {user.firstName[0]}{user.lastName[0]}
        </div>
        <div>
          <p className="text-xl font-semibold">
            {user.firstName} {user.lastName}
          </p>
          <p className="text-gray-500">{user.email}</p>
        </div>
      </div>

      {/* PERSONAL INFO */}
      <section>
        <h2 className="font-semibold mb-3">Personal Info</h2>
        <input
          value={user.firstName}
          onChange={(e) => setUser({ ...user, firstName: e.target.value })}
          className="border p-2 mr-2"
        />
        <input
          value={user.lastName}
          onChange={(e) => setUser({ ...user, lastName: e.target.value })}
          className="border p-2"
        />
        <button
          onClick={async () => {
            const updated = await updateProfile(user);
            setUser(updated);
          }}
          className="ml-3 px-4 py-2 bg-black text-white"
        >
          Save
        </button>
      </section>

      {/* ADDRESS */}
      <section>
        <h2 className="font-semibold mb-3">Address</h2>
        <input
          placeholder="Address"
          value={user.address || ""}
          onChange={(e) => setUser({ ...user, address: e.target.value })}
          className="border p-2 block mb-2"
        />
        <input
          placeholder="City"
          value={user.city || ""}
          onChange={(e) => setUser({ ...user, city: e.target.value })}
          className="border p-2 block mb-2"
        />
        <input
          placeholder="Zip Code"
          value={user.zipCode || ""}
          onChange={(e) => setUser({ ...user, zipCode: e.target.value })}
          className="border p-2"
        />
        <button
          onClick={async () => {
            const updated = await updateAddress(user);
            setUser(updated);
          }}
          className="ml-3 px-4 py-2 bg-black text-white"
        >
          Save Address
        </button>
      </section>

      {/* PASSWORD */}
      <section>
        <h2 className="font-semibold mb-3">Change Password</h2>
        <input type="password" placeholder="Current password" id="cur" className="border p-2 mr-2" />
        <input type="password" placeholder="New password" id="new" className="border p-2" />
        <button
          onClick={() =>
            changePassword({
              currentPassword: document.getElementById("cur").value,
              newPassword: document.getElementById("new").value,
            })
          }
          className="ml-3 px-4 py-2 bg-black text-white"
        >
          Update
        </button>
      </section>

      {/* LOGOUT */}
      <button
        onClick={async () => {
          await logoutUser();
          navigate("/login");
        }}
        className="px-6 py-3 bg-red-600 text-white"
      >
        Logout
      </button>
    </div>
  );
}
