import React from "react";
import Navbar from "../components/layout/Navbar/Navbar.jsx";
import HeroBanner from "../components/home/HeroBanner/HomeBanner.jsx";
import BestSellers from "../components/home/BestSeller/BestSellers.jsx"

const HomePage = () => {
  return (
    <div className="min-h-screen ">
      <Navbar />
      <HeroBanner />
      <BestSellers/>
    </div>
  );
};

export default HomePage;
