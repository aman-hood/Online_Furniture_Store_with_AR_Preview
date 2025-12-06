import React from "react";
import { FiMail, FiGift } from "react-icons/fi";

const TopBar = () => {
  return (
    <div className="text-white text-sm py-1 opacity-80 border-b border-gray-300/30">
      <div className="max-w-8xl mx-auto flex justify-between">

        {/* LEFT */}
        <span className="flex gap-2">
          <span className="border-r border-gray-300/30 px-2">
            Store Location
          </span>

          <span className="flex items-center gap-2">
            <FiMail />
            support@funio.com
          </span>
        </span>

        {/* RIGHT */}
        <span className="flex gap-6">
          <span className="hidden md:flex gap-2">
            <span className="border-r px-2 flex items-center gap-2">
              <FiGift /> Gift Cards
            </span>
            <span>FAQ</span>
          </span>
        </span>

      </div>
    </div>
  );
};

export default TopBar;
