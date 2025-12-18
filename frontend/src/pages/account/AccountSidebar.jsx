const Item = ({ label, active, onClick, danger }) => (
  <button
    onClick={onClick}
    className={`w-full text-left px-6 py-4 text-sm border-b transition
      ${
        danger
          ? "text-red-600 hover:bg-red-50"
          : active
          ? "bg-[#f4efe9] font-medium"
          : "text-[#6b6258] hover:bg-[#faf8f5]"
      }`}
  >
    {label}
  </button>
);

export default function AccountSidebar({ activeTab, setActiveTab, onLogout }) {
  return (
    <aside className="bg-white rounded-2xl border h-fit">
      <Item label="Personal Information" active={activeTab === "profile"} onClick={() => setActiveTab("profile")} />
      <Item label="My Orders" active={activeTab === "orders"} onClick={() => setActiveTab("orders")} />
      <Item label="Manage Address" active={activeTab === "address"} onClick={() => setActiveTab("address")} />
      <Item label="Password Manager" active={activeTab === "password"} onClick={() => setActiveTab("password")} />
      <Item label="Logout" danger onClick={onLogout} />
    </aside>
  );
}
