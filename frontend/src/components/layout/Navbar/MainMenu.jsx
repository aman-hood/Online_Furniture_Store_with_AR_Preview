import React, { useState, useRef, useEffect } from "react";
import { FiSearch, FiHeart, FiShoppingCart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { shopMenu, productMenu, pageMenu } from "./menuData";
import AccountDropdown from "./AccountDropdown";
import MenuDropdown from "./MenuDropdown";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useApp } from "../../../context/AppContext";

/* TEMP SEARCH DATA */
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

const MainMenu = () => {
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
console.log("Navbar cartCount:", cartCount);
  /* INITIAL LOAD (USER + COUNTS) */
  useEffect(() => {
    const initNavbar = async () => {
      try {
        // User
        const userRes = await fetch("http://localhost:3000/api/users/me", {
          credentials: "include",
        });
        const userData = await userRes.json();
        setUser(userData.success ? userData.user : null);

        // Wishlist
        const wlRes = await fetch("http://localhost:3000/api/wishlist", {
          credentials: "include",
        });
        const wlData = await wlRes.json();
        setWishlistCount(wlData?.wishlist?.items?.length || 0);

        // Cart
        const cartRes = await fetch("http://localhost:3000/api/cart", {
          credentials: "include",
        });
        const cartData = await cartRes.json();
        setCartCount(
  cartData?.items?.length ??
  cartData?.cart?.items?.length ??
  0
);

      } catch {
        setUser(null);
        setWishlistCount(0);
        setCartCount(0);
      }
    };

    initNavbar();
  }, []);

  /* MEGA MENU HANDLERS */
  const handleOpenMenu = (i) => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setOpenMenu(i);
  };

  const handleCloseMenu = () => {
    closeTimeout.current = setTimeout(() => setOpenMenu(null), 200);
  };

  /* SEARCH */
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

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/search?q=${query}`);
    setSearchOpen(false);
    setQuery("");
  };

  const filteredSuggestions =
    query.length > 0
      ? searchSuggestions.filter((s) =>
          s.toLowerCase().includes(query.toLowerCase())
        )
      : [];

  return (
    <div className="py-4">
      <div className="max-w-8xl mx-auto px-4 flex justify-between items-center text-white">

        {/* LEFT */}
        <div className="flex items-center gap-20">
          <h1 className="text-2xl font-bold">HOMESPACE</h1>

          <ul className="hidden md:flex gap-10 font-medium relative">
            {menuItems.map((item, index) => (
              <li
                key={index}
                className="relative"
                onMouseEnter={() => item.type === "mega" && handleOpenMenu(index)}
                onMouseLeave={() => item.type === "mega" && handleCloseMenu()}
              >
                <Link to={item.path} className="flex gap-1 hover:text-gray-300">
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

  {/* 🔍 SEARCH */}
  <div className="relative flex items-center" ref={searchRef}>
    <button
      onClick={() => setSearchOpen((p) => !p)}
      className="hover:opacity-70 transition"
    >
      <FiSearch />
    </button>

    <form
      onSubmit={handleSearchSubmit}
      className={`
        relative flex items-center overflow-hidden
        transition-all duration-200 ease-out
        ${searchOpen ? "w-56 ml-3 opacity-100" : "w-0 ml-0 opacity-0"}
      `}
    >
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
        className="
          w-full bg-transparent
          border-b border-white/60
          focus:border-white
          outline-none
          text-sm text-white
          placeholder-white/60
          py-1
        "
      />

      {/* Suggestions */}
      {searchOpen && filteredSuggestions.length > 0 && (
        <div className="absolute top-8 left-0 w-full bg-white text-black rounded-lg shadow z-50">
          {filteredSuggestions.map((s, i) => (
            <div
              key={i}
              onClick={() => {
                navigate(`/search?q=${s}`);
                setSearchOpen(false);
                setQuery("");
              }}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
            >
              {s}
            </div>
          ))}
        </div>
      )}
    </form>
  </div>

  {/* ACCOUNT */}
  <AccountDropdown />

  {/* ❤️ WISHLIST */}
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
      }, 120);
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

  {/* 🛒 CART */}
  <button
    onClick={() => {
      setCartFlash(true);
      setTimeout(() => {
        setCartFlash(false);
        navigate("/cart");
      }, 120);
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
        cartFlash ? "scale-125 animate-bounce" : "hover:opacity-70"
      }`}
    />
  </button>

</div>

      </div>
    </div>
  );
};

export default MainMenu;
