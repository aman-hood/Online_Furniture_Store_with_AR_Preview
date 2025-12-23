import React from "react";
import Navbar from "../components/layout/Navbar/Navbar.jsx";
import HeroBanner from "../components/home/HeroBanner/HomeBanner.jsx";
import BestSellers from "../components/home/BestSeller/BestSellers.jsx"
import Categories from "../components/home/Categories/Categories.jsx"
import PopularPicks from "../components/home/PopularPicks/PopularPicks.jsx"
import ShopByRoom from "../components/home/ShopByRoom/ShopByRoom";
import Footer from "../components/layout/Footer/footer";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const HomePage = () => {

  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const el = document.getElementById(location.state.scrollTo);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);
  return (
    <div className="min-h-screen ">
      <Navbar />
      <HeroBanner />
      <BestSellers/>
      <Categories/>
      <PopularPicks/>
        <section id="shop-by-room">
          <ShopByRoom/>
        </section>
      <Footer/>
    </div>
  );
};

export default HomePage;
