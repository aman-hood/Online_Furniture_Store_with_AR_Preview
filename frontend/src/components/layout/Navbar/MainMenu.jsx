import React, { useState, useRef, useEffect } from "react";
import { FiSearch, FiHeart, FiShoppingCart } from "react-icons/fi";
import { shopMenu, productMenu, pageMenu } from "./menuData";
import AccountDropdown from "./AccountDropdown";
import MenuDropdown from "./MenuDropdown";
import { Link, useNavigate } from "react-router-dom";

/* 🔹 TEMP SEARCH DATA (replace later with real products) */
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
      { heading: "BLOG PAGES", items: ["Latest Posts", "Blog Grid", "Single Post"] },
    ],
    path: "/blog",
  },
];

const MainMenu = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  const closeTimeout = useRef(null);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  /* -------------------------
     MEGA MENU
  ------------------------- */
  const handleOpenMenu = (index) => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setOpenMenu(index);
  };

  const handleCloseMenu = () => {
    closeTimeout.current = setTimeout(() => setOpenMenu(null), 200);
  };

  /* -------------------------
     CLOSE SEARCH ON OUTSIDE CLICK
  ------------------------- */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false);
        setQuery("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* -------------------------
     ESC KEY TO CLOSE SEARCH
  ------------------------- */
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setSearchOpen(false);
        setQuery("");
      }
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  /* -------------------------
     SEARCH SUBMIT
  ------------------------- */
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    navigate(`/search?q=${query}`);
    setSearchOpen(false);
    setQuery("");
  };

  /* -------------------------
     FILTER SUGGESTIONS
  ------------------------- */
  const filteredSuggestions =
    query.length > 0
      ? searchSuggestions.filter((item) =>
          item.toLowerCase().includes(query.toLowerCase())
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
                className="relative cursor-pointer"
                onMouseEnter={() => item.type === "mega" && handleOpenMenu(index)}
                onMouseLeave={() => item.type === "mega" && handleCloseMenu()}
              >
                <Link to={item.path} className="flex items-center gap-1 hover:text-gray-300">
                  {item.label}
                  {item.type === "mega" && <span>▾</span>}
                </Link>

                {item.type === "mega" && (
                  <MenuDropdown sections={item.data} mega open={openMenu === index} />
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT ICONS */}
        <div className="flex items-center gap-5 text-xl">

          {/* 🔍 SEARCH */}
          <div className="relative flex items-center" ref={searchRef}>
            <button
              onClick={() => setSearchOpen((prev) => !prev)}
              className="hover:opacity-70 transition"
              aria-label="Search"
            >
              <FiSearch />
            </button>

            {/* INPUT */}
            <form
              onSubmit={handleSearchSubmit}
              className={`
                relative flex items-center overflow-hidden
                transition-all duration-200 ease-out
                ${searchOpen ? "w-56 ml-3 opacity-100" : "w-0 ml-0 opacity-0"}
              `}
            >
              <input
                type="text"
                autoFocus={searchOpen}
                placeholder="Search products..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
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

              {/* LIVE SUGGESTIONS */}
              {searchOpen && filteredSuggestions.length > 0 && (
                <div className="
                  absolute top-8 left-0 w-full
                  bg-white text-gray-800
                  rounded-lg
                  shadow-[0_16px_40px_rgba(0,0,0,0.15)]
                  overflow-hidden
                ">
                  {filteredSuggestions.map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        navigate(`/search?q=${item}`);
                        setSearchOpen(false);
                        setQuery("");
                      }}
                      className="
                        px-4 py-2 text-sm
                        hover:bg-gray-100
                        cursor-pointer
                      "
                    >
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </form>
          </div>

          {/* ACCOUNT */}
          <AccountDropdown />

          {/* WISHLIST */}
          <Link to="/wishlist" className="hover:opacity-70">
            <FiHeart />
          </Link>

          {/* CART */}
          <Link to="/cart" className="hover:opacity-70">
            <FiShoppingCart />
          </Link>
        </div>

      </div>
    </div>
  );
};

export default MainMenu;
