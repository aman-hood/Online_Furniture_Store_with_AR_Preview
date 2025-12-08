import React, { useState, useRef } from "react";
import { FiUser, FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function AccountDropdown() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [open, setOpen] = useState(false);
  const closeTimeout = useRef(null);

  const openMenu = () => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setOpen(true);
  };

  const closeMenu = () => {
    closeTimeout.current = setTimeout(() => {
      setOpen(false);
    }, 200); // Amazon-style delay
  };

  return (
    <div
      className="relative"
      onMouseEnter={openMenu}
      onMouseLeave={closeMenu}
    >
      {/* Icon */}
      <FiUser className="cursor-pointer hover:opacity-70" />

      {/* Dropdown */}
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
              {/* NOT LOGGED IN UI */}
              <div className="pb-4 mb-3 border-b border-gray-300/40 flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">New customer?</span>
                <Link className="text-sm text-blue-600 hover:underline" to="/signup">
                  Sign Up
                </Link>
              </div>

             
            </>
          ) : (
            <>
              {/* LOGGED IN UI */}
              <div className="pb-4 mb-3 border-b border-gray-300/40">
                <p className="text-sm font-semibold text-gray-800">Hi, Nancy</p>
                <p className="text-xs text-gray-500 mt-1">Manage your account</p>
              </div>

              <Link
                className="
                  block px-2 py-2 text-gray-700 rounded-md
                  border-b border-gray-300/40 text-sm
                  hover:bg-gray-200/60 transition
                "
              >
                <div className="flex items-center gap-2">
                  <FiUser /> My Profile
                </div>
              </Link>

              <Link
                className="
                  block px-2 py-2 text-gray-700 rounded-md
                  border-b border-gray-300/40 text-sm
                  hover:bg-gray-200/60 transition
                "
              >
                <div className="flex items-center gap-2">
                  <FiShoppingCart /> Cart
                </div>
              </Link>

              <button
                onClick={() => setIsLoggedIn(false)}
                className="
                  w-full mt-3 py-2 rounded-md bg-black text-white
                  hover:bg-gray-900 transition text-sm
                "
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
