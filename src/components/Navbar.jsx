import React, {useState} from 'react';
import { FiSearch, FiUser, FiHeart, FiShoppingCart, FiMail, FiGift } from "react-icons/fi";
import MegaMenu from "./MegaMenu";
import { shopMenu, productMenu, pageMenu } from "../menuData";

const Navbar = () => {

  return (
    <div className="absolute top-0 left-0 w-full z-20">

      {/* TOP ROW */}
      <div className="text-white text-sm py-1 opacity-80 border-b border-gray-300/30">
        <div className="max-w-8xl mx- flex justify-between">

        {/* Left Side */}
          <span className="flex gap-2">
            <span className="border-r border-gray-300/30 px-2">Store Location</span>
            <span className="flex items-center gap-2">
              <FiMail className="cursor-pointer hover:opacity-70" />
              support@funio.com
              </span>
          </span>

        {/* Right Side */}
          <span className="flex gap-6">
            <span className="hidden md:flex gap-2">
              <span className="border-r border-gray-300/30 px-2 flex items-center gap-2"><FiGift className="cursor-pointer hover:opacity-70" />Gift Cards</span>
              <span>FAQ</span>
            </span>
          </span>
          
        </div>
      </div>

      {/* MAIN NAV */}
      <div className="py-4">
        <div className="max-w-8xl mx-2 flex justify-between items-center text-white">
          
          <div className = "flex justify-between gap-20 items-center">
            {/* LOGO */}
          <h1 className="text-2xl font-bold">FUNIO</h1>

          {/* MENU */}
          <ul className="hidden md:flex gap-10 font-medium">
            <li className="cursor-pointer relative hover:text-gray-200 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 hover:after:w-full after:bg-white after:transition-all">HOME</li>
            <MegaMenu title="SHOP" columns={shopMenu} />
            <MegaMenu title="PRODUCT" columns={productMenu} />
            <MegaMenu title="PAGE" columns={pageMenu} />
            <li className="cursor-pointer hover:text-gray-200 transition"> BLOG </li>
          </ul>
          </div>
          

          {/* ICONS */}
          <div className="flex items-center gap-4 text-xl">
            <FiSearch className="cursor-pointer hover:opacity-70" />
            <FiUser className="cursor-pointer hover:opacity-70" />
            <FiHeart className="cursor-pointer hover:opacity-70" />
            <FiShoppingCart className="cursor-pointer hover:opacity-70" />
          </div>
        </div>
      </div>

    </div>
  );
};

export default Navbar;
