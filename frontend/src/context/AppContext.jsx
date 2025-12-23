import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  /* ================= USER ================= */
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  /* ================= WISHLIST ================= */
  const [wishlistIds, setWishlistIds] = useState([]);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [wishlistLoading, setWishlistLoading] = useState(false);

  /* ================= CART ================= */
  const [cartCount, setCartCount] = useState(0);

  /* ================= LOAD USER ON APP START ================= */
  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await fetch(
          "http://localhost:3000/api/users/me",
          {
            method: "GET",
            credentials: "include", // 🔥 REQUIRED
          }
        );

        const data = await res.json();

        if (data.success) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (err) {
        setUser(null);
      } finally {
        setLoadingUser(false);
      }
    };

    loadUser();
  }, []);

  return (
    <AppContext.Provider
      value={{
        /* USER */
        user,
        setUser,
        loadingUser,

        /* WISHLIST */
        wishlistIds,
        setWishlistIds,
        wishlistCount,
        setWishlistCount,
        wishlistLoading,
        setWishlistLoading,

        /* CART */
        cartCount,
        setCartCount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
};
