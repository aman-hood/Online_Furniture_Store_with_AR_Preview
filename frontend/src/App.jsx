import { useEffect } from "react";
import AppRoutes from "./router/AppRoutes";
import ScrollToTop from "./common/ScrollToTop";
import { useApp } from "/src/context/AppContext";
import { Toaster } from "react-hot-toast";


export default function App() {
  const {
    setWishlistIds,
    setWishlistCount,
    setWishlistLoading, // ✅ NOW EXISTS
  } = useApp();

 useEffect(() => {
  const loadWishlist = async () => {
    const res = await fetch("http://localhost:3000/api/wishlist", {
      credentials: "include",
    });
    const data = await res.json();

    const ids =
      data?.wishlist?.items?.map(
        (item) => item.product?._id || item._id
      ) || [];

    setWishlistIds(ids);
    setWishlistCount(ids.length);
    setWishlistLoading(false);
  };

  loadWishlist();
}, []);


  return (
    <>
      <ScrollToTop />
      <AppRoutes />
      <Toaster position="top-right" />
    </>
  );
}

