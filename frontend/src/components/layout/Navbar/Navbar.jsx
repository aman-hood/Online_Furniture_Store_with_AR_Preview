import React from "react";
import TopBar from "./TopBar";
import MainMenu from "./MainMenu";

const Navbar = () => {
  return (
    <div className="absolute top-0 left-0 w-full z-20">
      <TopBar />
      <MainMenu />
    </div>
  );
};

export default Navbar;
