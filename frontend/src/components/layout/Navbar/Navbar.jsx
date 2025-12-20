import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import TopBar from "./TopBar";
import MainMenu from "./MainMenu";

const Navbar = () => {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`
        fixed top-0 w-full z-50 transition-all duration-300
        ${
          isHome && !scrolled
            ? "bg-transparent"
            : "bg-white/95 backdrop-blur-md shadow-sm"
        }
      `}
    >
      <TopBar isHome={isHome && !scrolled} />
      <MainMenu isHome={isHome && !scrolled} />
    </header>
  );
};

export default Navbar;
