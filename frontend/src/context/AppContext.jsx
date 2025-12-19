import { createContext, useContext, useState } from "react";

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [wishlistIds, setWishlistIds] = useState([]);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [wishlistLoading, setWishlistLoading] = useState(false);

  const [cartCount, setCartCount] = useState(0); // ✅ REQUIRED

  return (
    <AppContext.Provider
      value={{
        wishlistIds,
        setWishlistIds,
        wishlistCount,
        setWishlistCount,
        wishlistLoading,
        setWishlistLoading,
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
