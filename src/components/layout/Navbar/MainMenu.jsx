import React, { useState, useRef } from "react";
import { FiSearch, FiUser, FiHeart, FiShoppingCart } from "react-icons/fi";
import { shopMenu, productMenu, pageMenu } from "./menuData";
import AccountDropdown from "./AccountDropdown";
import MenuDropdown from "./MenuDropdown";
import { Link } from "react-router-dom";


const menuItems = [
  { label: "HOME", type: "none", path: "/" },
  { label: "SHOP", type: "mega", data: shopMenu, path: "/shop" },
  { label: "PRODUCT", type: "mega", data: productMenu, path: "/product" },
  { label: "PAGE", type: "mega", data: pageMenu, path: "/page" },
  {
    label: "BLOG",
    type: "mega",
    data: [{ heading: "BLOG PAGES", items: ["Latest Posts", "Blog Grid", "Single Post"] }],
    path: "/blog",
  },
];

const MainMenu = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const closeTimeout = useRef(null);

  const handleOpenMenu = (index) => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setOpenMenu(index);
  };

  const handleCloseMenu = () => {
    closeTimeout.current = setTimeout(() => {
      setOpenMenu(null);
    }, 200);
  };

  return (
    <div className="py-4">
      <div className="max-w-8xl mx-auto px-4 flex justify-between items-center text-white">

        {/* LEFT (Logo + Menu) */}
        <div className="flex items-center gap-20">

          {/* LOGO */}
          <h1 className="text-2xl font-bold">FUNIO</h1>

          {/* MENU */}
          <ul className="hidden md:flex gap-10 font-medium relative">
            {menuItems.map((item, index) => (
               <li
              key={index}
              className="cursor-pointer relative"
              onMouseEnter={() => item.type === "mega" && handleOpenMenu(index)}
              onMouseLeave={() => item.type === "mega" && handleCloseMenu()}
            >

                {/* LABEL + MAKE IT CLICKABLE */}
                <Link
                  to={item.path}
                  className="flex items-center gap-1 hover:text-gray-300 transition select-none"
                >
                  {item.label}

                  {item.type === "mega" && (
                    <span
                      className={`transition-transform duration-200 ${
                        openMenu === index ? "rotate-180" : ""
                      }`}
                    >
                      ▾
                    </span>
                  )}
                </Link>

                {/* DROPDOWN FOR MEGA MENUS */}
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

        {/* RIGHT ICONS */}
        <div className="flex items-center gap-5 text-xl">
          <FiSearch className="cursor-pointer hover:opacity-70" />
<AccountDropdown />
          <FiHeart className="cursor-pointer hover:opacity-70" />
          <FiShoppingCart className="cursor-pointer hover:opacity-70" />
        </div>

      </div>
    </div>
  );
};

export default MainMenu;
