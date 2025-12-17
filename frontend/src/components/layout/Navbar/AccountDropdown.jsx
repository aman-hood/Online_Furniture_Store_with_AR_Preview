import React, { useState, useRef, useEffect } from "react";
import { FiUser, FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function AccountDropdown() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const closeTimeout = useRef(null);

  // -------------------------
  // Fetch user login status from backend
  // -------------------------
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/users/me", {
          credentials: "include", // important for cookies
        });

        const data = await res.json();

        if (data?.success) {
          setIsLoggedIn(true);
          setUser(data.user);
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      } catch (err) {
        setIsLoggedIn(false);
        setUser(null);
      }
    };

    checkLogin();
  }, []);

  // Hover menu behavior
  const openMenu = () => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setOpen(true);
  };

  const closeMenu = () => {
    closeTimeout.current = setTimeout(() => {
      setOpen(false);
    }, 200);
  };

  // -------------------------
  // Logout handler
  // -------------------------
  const handleLogout = async () => {
    await fetch("http://localhost:3000/api/users/logout", {
      method: "POST",
      credentials: "include",
    });

    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <div className="relative" onMouseEnter={openMenu} onMouseLeave={closeMenu}>
      <FiUser className="cursor-pointer hover:opacity-70" />

      {open && (
        <div
          className="
            absolute right-0 mt-4 w-60 rounded-xl shadow-lg z-50 border
            bg-[#f7f3ed] border-[#e6e2d9] p-5 animate-[fadeIn_0.2s_ease-out]
          "
        >
          {!isLoggedIn ? (
            <>
              <div className="pb-4 mb-3 border-b border-gray-300/40 flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">
                  New customer?
                </span>
                <Link
                  className="text-sm text-blue-600 hover:underline"
                  to="/signup"
                >
                  Sign Up
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className="pb-4 mb-3 border-b border-gray-300/40">
                <p className="text-sm font-semibold text-gray-800">
                  Hi, {user?.firstName || "User"}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Manage your account
                </p>
              </div>

              <Link to="/profile" className="block px-2 py-2 text-gray-700 rounded-md border-b border-gray-300/40 text-sm hover:bg-gray-200/60 transition">
                <div className="flex items-center gap-2">
                  <FiUser /> My Profile
                </div>
              </Link>

              {user?.role === "admin" && (
                <>
                  <Link to="/admin/products" className="block px-2 py-2 text-gray-700 rounded-md border-b border-gray-300/40 text-sm hover:bg-gray-200/60 transition">
                    <div className="flex items-center gap-2">
                      🛠️ Admin Products
                    </div>
                  </Link>
                  <Link to="/admin/products/new" className="block px-2 py-2 text-gray-700 rounded-md border-b border-gray-300/40 text-sm hover:bg-gray-200/60 transition">
                    <div className="flex items-center gap-2">
                      ➕ Add Product
                    </div>
                  </Link>
                </>
              )}

              <Link to="/cart" className="block px-2 py-2 text-gray-700 rounded-md border-b border-gray-300/40 text-sm hover:bg-gray-200/60 transition">
                <div className="flex items-center gap-2">
                  <FiShoppingCart /> Cart
                </div>
              </Link>

              <button
                onClick={handleLogout}
                className="w-full mt-3 py-2 rounded-md bg-black text-white hover:bg-gray-900 transition text-sm"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
