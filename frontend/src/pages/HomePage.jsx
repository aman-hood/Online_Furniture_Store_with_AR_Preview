import React from "react";
import Navbar from "../components/layout/Navbar/Navbar.jsx";
import HeroBanner from "../components/home/HeroBanner/HomeBanner.jsx";
import BestSellers from "../components/home/BestSeller/BestSellers.jsx"
import Categories from "../components/home/Categories/Categories.jsx"
import PopularPicks from "../components/home/PopularPicks/PopularPicks.jsx"
import ShopByRoom from "../components/home/ShopByRoom/ShopByRoom";
import Footer from "../components/layout/Footer/footer";

const HomePage = () => {
  return (
    <div className="min-h-screen ">
      <Navbar />
      <HeroBanner />
      <BestSellers/>
      <Categories/>
      <PopularPicks/>
      <ShopByRoom/>
      <Footer/>
    </div>
  );
};

export default HomePage;
