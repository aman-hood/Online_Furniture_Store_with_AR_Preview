import React, { useState, useRef, useEffect } from "react";
import { FiSearch, FiHeart, FiShoppingCart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { shopMenu, productMenu, pageMenu } from "./menuData";
import AccountDropdown from "./AccountDropdown";
import MenuDropdown from "./MenuDropdown";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useApp } from "../../../context/AppContext";

const searchSuggestions = [
  "Wooden Chair",
  "Modern Sofa",
  "King Size Bed",
  "Hanging Lamp",
  "Dining Table",
  "Office Desk",
  "Wardrobe",
];

const menuItems = [
  { label: "HOME", type: "none", path: "/" },
  { label: "SHOP", type: "mega", data: shopMenu, path: "/shop" },
  { label: "PRODUCT", type: "mega", data: productMenu, path: "/product" },
  { label: "PAGE", type: "mega", data: pageMenu, path: "/page" },
  {
    label: "BLOG",
    type: "mega",
    data: [
      {
        heading: "BLOG PAGES",
        items: [
          { label: "Latest Posts", path: "/blog" },
          { label: "Blog Grid", path: "/blog/grid" },
          { label: "Single Post", path: "/blog/sample-post" },
        ],
      },
    ],
    path: "/blog",
  },
];

const MainMenu = ({ isHome }) => {
  const navigate = useNavigate();
  const { wishlistCount, setWishlistCount, cartCount, setCartCount } = useApp();

  const [user, setUser] = useState(null);
  const [heartFlash, setHeartFlash] = useState(false);
  const [cartFlash, setCartFlash] = useState(false);

  const [openMenu, setOpenMenu] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  const closeTimeout = useRef(null);
  const searchRef = useRef(null);

  /* INITIAL LOAD */
useEffect(() => {
  const initNavbar = async () => {
    try {
      // USER
      const userRes = await fetch("http://localhost:3000/api/users/me", {
        credentials: "include",
      });
      const userData = await userRes.json();
      setUser(userData.success ? userData.user : null);

      // WISHLIST
      const wlRes = await fetch("http://localhost:3000/api/wishlist", {
        credentials: "include",
      });
      const wlData = await wlRes.json();
      setWishlistCount(
        wlData?.wishlist?.items?.length ?? 0
      );

      // CART (🔥 quantity-aware)
      const cartRes = await fetch("http://localhost:3000/api/cart", {
        credentials: "include",
      });
      const cartData = await cartRes.json();

      const cartItems =
        cartData?.items ?? cartData?.cart?.items ?? [];

      const totalQty = cartItems.reduce(
        (sum, it) => sum + (it.quantity || 1),
        0
      );

      setCartCount(totalQty);
    } catch {
      setUser(null);
      setWishlistCount(0);
      setCartCount(0);
    }
  };

  initNavbar();
}, []);


  /* CLOSE SEARCH ON OUTSIDE CLICK */
  useEffect(() => {
    const closeOnOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", closeOnOutside);
    return () => document.removeEventListener("mousedown", closeOnOutside);
  }, []);

  return (
    <div className={`py-4 ${isHome ? "bg-transparent" : "bg-white"}`}>
      <div
        className={`max-w-8xl mx-auto px-4 flex justify-between items-center ${
          isHome ? "text-white" : "text-[#1a1816]"
        }`}
      >
        {/* LEFT */}
        <div className="flex items-center gap-20">
          <h1 className="text-2xl font-bold">HOMESPACE</h1>

          <ul className="hidden md:flex gap-10 font-medium relative">
            {menuItems.map((item, index) => (
              <li
                key={index}
                className="relative"
                onMouseEnter={() =>
                  item.type === "mega" && setOpenMenu(index)
                }
                onMouseLeave={() => setOpenMenu(null)}
              >
                <Link
                  to={item.path}
                  className={`transition ${
                    isHome
                      ? "text-white hover:text-white/80"
                      : "text-[#1a1816] hover:text-black"
                  }`}
                >
                  {item.label}
                  {item.type === "mega" && <span>▾</span>}
                </Link>

                {item.type === "mega" && (
                  <MenuDropdown
                    sections={item.data}
                    mega
                    open={openMenu === index}
                  />
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-6 text-xl">
          {/* SEARCH */}
          <div className="relative flex items-center" ref={searchRef}>
            <button
              onClick={() => setSearchOpen((p) => !p)}
              className="hover:opacity-70 transition"
            >
              <FiSearch
                className={isHome ? "text-white" : "text-[#1a1816]"}
              />
            </button>
          </div>

          <AccountDropdown />

          {/* ❤️ WISHLIST (RESTORED EFFECT) */}
          <NavLink
            to="/wishlist"
            onClick={(e) => {
              if (!user) {
                e.preventDefault();
                navigate("/login");
                return;
              }
              e.preventDefault();
              setHeartFlash(true);
              setTimeout(() => {
                setHeartFlash(false);
                navigate("/wishlist");
              }, 150);
            }}
            className="relative flex items-center justify-center"
          >
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1 rounded-full">
                {wishlistCount}
              </span>
            )}
            {heartFlash ? (
              <FaHeart className="text-red-500 scale-110 transition" />
            ) : (
              <FiHeart className="hover:opacity-70 transition" />
            )}
          </NavLink>

          {/* 🛒 CART (RESTORED ANIMATION) */}
          <button
            onClick={() => {
              setCartFlash(true);
              setTimeout(() => {
                setCartFlash(false);
                navigate("/cart");
              }, 150);
            }}
            className="relative flex items-center justify-center"
          >
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] px-1 rounded-full">
                {cartCount}
              </span>
            )}
            <FiShoppingCart
              className={`transition-transform duration-150 ${
                cartFlash
                  ? "scale-125 animate-bounce"
                  : "hover:opacity-70"
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
