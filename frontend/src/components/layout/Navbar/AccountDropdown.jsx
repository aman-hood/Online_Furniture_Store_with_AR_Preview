import React, { useState, useRef, useEffect } from "react";
import { FiUser, FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function AccountDropdown() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);

  const closeTimeout = useRef(null);
  const containerRef = useRef(null);

  // -------------------------
  // Check login status
  // -------------------------
  const checkLogin = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/users/me", {
        credentials: "include",
      });
      const data = await res.json();

      if (data?.success) {
        setIsLoggedIn(true);
        setUser(data.user);
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    } catch {
      setIsLoggedIn(false);
      setUser(null);
    }
  };

  useEffect(() => {
    checkLogin();

    return () => {
      if (closeTimeout.current) clearTimeout(closeTimeout.current);
    };
  }, []);

  // -------------------------
  // Hover + open logic
  // -------------------------
  const openMenu = () => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    checkLogin(); // refresh auth state
    setOpen(true);
  };

  const closeMenu = () => {
    closeTimeout.current = setTimeout(() => {
      setOpen(false);
    }, 200);
  };

  // -------------------------
  // Click outside close
  // -------------------------
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // -------------------------
  // Logout
  // -------------------------
  const handleLogout = async () => {
    await fetch("http://localhost:3000/api/users/logout", {
      method: "POST",
      credentials: "include",
    });

    setUser(null);
    setIsLoggedIn(false);
    setOpen(false);
  };

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={openMenu}
      onMouseLeave={closeMenu}
    >
      <FiUser
        className={`cursor-pointer transition ${
          open ? "opacity-60" : "hover:opacity-70"
        }`}
        size={20}
      />

      {open && (
        <div
          className="
            absolute right-0 mt-4 w-60 rounded-xl shadow-lg z-50 border
            bg-[#f7f3ed] border-[#e6e2d9] p-5
            animate-[fadeIn_0.2s_ease-out]
          "
        >
          {!isLoggedIn ? (
            <>
  <div className="flex flex-col gap-3">

    {/* Primary action */}
    <Link
      to="/signup"
      className="group w-full rounded-2xl
                 bg-[#F6F1EA] px-4 py-3
                 text-sm font-medium text-gray-800
                 flex items-center justify-between
                 hover:bg-[#EFE7DC]
                 transition"
    >
      <span>Create an account</span>
      <span className="opacity-60 group-hover:translate-x-0.5 transition">
        →
      </span>
    </Link>

    {/* Secondary action */}
    <div className="text-center text-xs text-gray-500">
      Already have an account?{" "}
      <Link
        to="/login"
        className="text-gray-700 font-medium hover:text-gray-900"
      >
        Log in
      </Link>
    </div>

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

              <Link
                to="/profile"
                className="block px-2 py-2 text-gray-700 text-sm border-b border-gray-300/40 rounded-md hover:bg-gray-200/60 transition"
              >
                <div className="flex items-center gap-2">
                  <FiUser /> My Profile
                </div>
              </Link>

              {user?.role === "admin" && (
                <>
                  <Link
                    to="/admin/products"
                    className="block px-2 py-2 text-gray-700 text-sm border-b border-gray-300/40 rounded-md hover:bg-gray-200/60 transition"
                  >
                    🛠️ Admin Products
                  </Link>

                  <Link
                    to="/admin/products/new"
                    className="block px-2 py-2 text-gray-700 text-sm border-b border-gray-300/40 rounded-md hover:bg-gray-200/60 transition"
                  >
                    ➕ Add Product
                  </Link>
                </>
              )}

              <Link
                to="/cart"
                className="block px-2 py-2 text-gray-700 text-sm border-b border-gray-300/40 rounded-md hover:bg-gray-200/60 transition"
              >
                <div className="flex items-center gap-2">
                  <FiShoppingCart /> Cart
                </div>
              </Link>

              <button
                onClick={handleLogout}
                className="w-full mt-3 py-2 rounded-md bg-black text-white text-sm hover:bg-gray-900 transition"
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
