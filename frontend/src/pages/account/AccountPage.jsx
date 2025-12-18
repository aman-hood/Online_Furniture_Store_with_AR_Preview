import React, { useEffect, useState } from "react";
import { getProfile, logoutUser } from "../../services/profileService";
import { useNavigate } from "react-router-dom";

import AccountSidebar from "./AccountSidebar";
import ProfileTab from "./tabs/ProfileTab";
import OrdersTab from "./tabs/OrdersTab";
import AddressTab from "./tabs/AddressTab";
import PasswordTab from "./tabs/PasswordTab";

const TABS = {
  PROFILE: "profile",
  ORDERS: "orders",
  ADDRESS: "address",
  PASSWORD: "password",
};

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState(TABS.PROFILE);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getProfile().then(setUser);
  }, []);

  const handleLogout = async () => {
    await logoutUser();
    navigate("/login");
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[#8a8177]">
        Loading account…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fbf9f6]">
      <div className="pt-32 pb-16 text-center">
        <h1 className="text-[38px] font-medium text-[#3f3a33]">My Account</h1>
        <p className="text-sm text-[#8a8177] mt-2">
          Home / <span className="text-[#3f3a33]">My Account</span>
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-32 grid grid-cols-1 lg:grid-cols-4 gap-12">
        <AccountSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onLogout={handleLogout}
        />

        <div className="lg:col-span-3 bg-white rounded-2xl border p-10">
          {activeTab === TABS.PROFILE && <ProfileTab user={user} setUser={setUser} />}
          {activeTab === TABS.ORDERS && <OrdersTab />}
          {activeTab === TABS.ADDRESS && <AddressTab user={user} setUser={setUser} />}
          {activeTab === TABS.PASSWORD && <PasswordTab />}
        </div>
      </div>
    </div>
  );
}
