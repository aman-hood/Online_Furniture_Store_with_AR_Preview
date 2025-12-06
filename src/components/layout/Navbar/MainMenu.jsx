import React, { useState } from "react";
import { FiSearch, FiUser, FiHeart, FiShoppingCart } from "react-icons/fi";
import { shopMenu, productMenu, pageMenu } from "./menuData";
import MenuDropdown from "./MenuDropdown";

const menuItems = [
  { label: "HOME", type: "none" },
  { label: "SHOP", type: "mega", data: shopMenu },
  { label: "PRODUCT", type: "mega", data: productMenu },
  { label: "PAGE", type: "mega", data: pageMenu },
  {
    label: "BLOG",
    type: "mega",
    data: [{ heading: "BLOG PAGES", items: ["Latest Posts", "Blog Grid", "Single Post"] }],
  },
];

const MainMenu = () => {
  const [openMenu, setOpenMenu] = useState(null);

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
                onMouseEnter={() => setOpenMenu(index)}
                onMouseLeave={() => setOpenMenu(null)}
              >

                {/* LABEL + ARROW (arrow only for mega menus) */}
                <span className="flex items-center gap-1 hover:text-gray-300 transition select-none">
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
                </span>

                {/* DROPDOWNS - only for mega items */}
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
          <FiUser className="cursor-pointer hover:opacity-70" />
          <FiHeart className="cursor-pointer hover:opacity-70" />
          <FiShoppingCart className="cursor-pointer hover:opacity-70" />
        </div>

      </div>
    </div>
  );
};

export default MainMenu;
