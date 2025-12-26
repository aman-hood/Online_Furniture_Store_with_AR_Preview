import React, { useState, useRef, useEffect } from "react";
import {
  FiSearch,
  FiHeart,
  FiShoppingCart,
  FiBell,
} from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { shopMenu, productMenu, pageMenu } from "./menuData";
import AccountDropdown from "./AccountDropdown";
import MenuDropdown from "./MenuDropdown";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useApp } from "../../../context/AppContext";
import { io } from "socket.io-client";

/* 🔌 SOCKET (ONLY ONCE) */
const socket = io("http://localhost:3000", {
  withCredentials: true,
});

const searchSuggestions = [
  "Wooden Chair",
  "Modern Sofa",
  "King Size Bed",
  "Hanging Lamp",
  "Dining Table",
  "Office Desk",
  "Wardrobe",
];

const menuItems = [
  { label: "HOME", type: "none", path: "/" },
  { label: "SHOP", type: "mega", data: shopMenu, path: "/collections" },
  { label: "ROOMS", type: "mega", data: productMenu, path: "/shop" },
  { label: "PAGE", type: "mega", data: pageMenu, path: "/account" },
  {
    label: "BLOG",
    type: "mega",
    data: [
      {
        heading: "BLOG PAGES",
        items: [
          { label: "Blog Grid", path: "/blog" },
          { label: "Latest Posts", path: "/blog/list" },
        ],
      },
    ],
    path: "/blog",
  },
];

const MainMenu = ({ isHome }) => {
  const navigate = useNavigate();
  const { wishlistCount, setWishlistCount, cartCount, setCartCount } =
    useApp();

  const [user, setUser] = useState(null);

  /* 🔔 NOTIFICATION STATE */
  const [newMsgCount, setNewMsgCount] = useState(0);
  const [pendingBlogCount, setPendingBlogCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [openNotifications, setOpenNotifications] = useState(false);
  const notifRef = useRef(null);

  const prevCountRef = useRef(0);
  const [bellPulse, setBellPulse] = useState(false);

  const [heartFlash, setHeartFlash] = useState(false);
  const [cartFlash, setCartFlash] = useState(false);

  const [openMenu, setOpenMenu] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  const searchRef = useRef(null);
  const closeTimer = useRef(null);

  /* ================= INIT LOAD ================= */
  useEffect(() => {
    const initNavbar = async () => {
      try {
        const userRes = await fetch(
          "http://localhost:3000/api/users/me",
          { credentials: "include" }
        );
        const userData = await userRes.json();
        const loggedUser = userData.success ? userData.user : null;
        setUser(loggedUser);

        const wlRes = await fetch(
          "http://localhost:3000/api/wishlist",
          { credentials: "include" }
        );
        const wlData = await wlRes.json();
        setWishlistCount(wlData?.wishlist?.items?.length ?? 0);

        const cartRes = await fetch(
          "http://localhost:3000/api/cart",
          { credentials: "include" }
        );
        const cartData = await cartRes.json();
        const items = cartData?.items ?? cartData?.cart?.items ?? [];
        setCartCount(items.reduce((s, i) => s + (i.quantity || 1), 0));

        if (loggedUser?.role === "admin") {
          fetchNotifications();
        }
      } catch {
        setUser(null);
        setWishlistCount(0);
        setCartCount(0);
        setNewMsgCount(0);
        setPendingBlogCount(0);
      }
    };

    initNavbar();
  }, []);

  /* ================= FETCH NOTIFICATIONS ================= */
  const fetchNotifications = async () => {
    try {
      const [contactRes, blogRes] = await Promise.all([
        fetch("http://localhost:3000/api/admin/contacts", {
          credentials: "include",
        }),
        fetch("http://localhost:3000/api/blogs/admin/pending", {
          credentials: "include",
        }),
      ]);

      const contacts = await contactRes.json();
      const blogs = await blogRes.json();

      const contactItems = contacts
      .filter((c) => c.status !== "replied")
      .map((c) => ({
        label: `📩 Contact from ${c.name}`,
        link: "/admin/messages",
        date: c.createdAt,
        type: "contact", // 🔥 ADD
      }));

    const blogItems = blogs.map((b) => ({
      label: `📝 Blog request: ${b.title}`,
      link: "/admin/blogs",
      date: b.createdAt,
      type: "blog", // 🔥 ADD
    }));


      const all = [...contactItems, ...blogItems].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );

      setNotifications(all);
      setNewMsgCount(contactItems.length);
      setPendingBlogCount(blogItems.length);
    } catch {
      setNotifications([]);
    }
  };

  /* ================= SOCKET ================= */
  useEffect(() => {
    if (user?.role !== "admin") return;

    socket.on("new_contact_message", fetchNotifications);
    socket.on("new_blog_request", fetchNotifications);

    return () => {
      socket.off("new_contact_message");
      socket.off("new_blog_request");
    };
  }, [user]);

  /* ================= BELL ANIMATION ================= */
  useEffect(() => {
    const total = newMsgCount + pendingBlogCount;
    if (total > prevCountRef.current) {
      setBellPulse(true);
      setTimeout(() => setBellPulse(false), 600);
    }
    prevCountRef.current = total;
  }, [newMsgCount, pendingBlogCount]);

  /* ================= CLOSE NOTIFICATION ================= */
  useEffect(() => {
    const handler = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setOpenNotifications(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* ================= CLOSE SEARCH ================= */
  useEffect(() => {
    const handler = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleNotificationClick = (index, type) => {
  setNotifications((prev) => prev.filter((_, i) => i !== index));

  if (type === "contact") {
    setNewMsgCount((c) => Math.max(0, c - 1));
  }

  if (type === "blog") {
    setPendingBlogCount((c) => Math.max(0, c - 1));
  }

  setOpenNotifications(false);
};


  return (
    <div className={`py-4 ${isHome ? "bg-transparent" : "bg-white"}`}>
      <div
        className={`max-w-8xl mx-auto px-4 flex justify-between items-center ${
          isHome ? "text-white" : "text-[#1a1816]"
        }`}
      >
        {/* LEFT */}
        <div className="flex items-center gap-20">
          <h1 className="text-2xl font-bold">HOMESPACE</h1>

          <ul className="hidden md:flex gap-10 font-medium relative">
            {menuItems.map((item, index) => (
              <li key={index} className="relative">
                <div
                  onMouseEnter={() => {
                    if (closeTimer.current)
                      clearTimeout(closeTimer.current);
                    if (item.type === "mega") setOpenMenu(index);
                  }}
                  onMouseLeave={() => {
                    closeTimer.current = setTimeout(() => {
                      setOpenMenu(null);
                    }, 150);
                  }}
                >
                  <Link to={item.path}>
                    {item.label}
                    {item.type === "mega" && <span> ▾</span>}
                  </Link>

                  {item.type === "mega" && (
                    <MenuDropdown
                      sections={item.data}
                      mega
                      open={openMenu === index}
                    />
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-6 text-xl relative">
          <AccountDropdown />

          {/* 🔔 ADMIN NOTIFICATION */}
          {user?.role === "admin" && (
            <button
              onClick={() =>
                setOpenNotifications((prev) => !prev)
              }
              className="relative flex items-center justify-center"
            >
              {(newMsgCount + pendingBlogCount) > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1 rounded-full">
                  {newMsgCount + pendingBlogCount}
                </span>
              )}
              <FiBell
                className={`transition ${
                  bellPulse
                    ? "animate-bounce text-red-500"
                    : "hover:opacity-70"
                }`}
              />
            </button>
          )}

          {openNotifications && (
            <div
              ref={notifRef}
              className="absolute right-0 top-10 w-80 bg-white border rounded-lg shadow-lg z-50"
            >
              <div className="p-3 border-b font-semibold">
                Notifications
              </div>

              {notifications.length === 0 ? (
                <p className="p-3 text-sm text-gray-500">
                  No new notifications
                </p>
              ) : (
                notifications.map((n, i) => (
                  <Link
                    key={i}
                    to={n.link}
                    onClick={() => handleNotificationClick(i, n.type)}
                    className="block px-4 py-3 text-sm hover:bg-gray-100 border-b"
                  >
                    {n.label}
                  </Link>

                ))
              )}
            </div>
          )}

          {/* WISHLIST */}
          <NavLink
            to="/wishlist"
            onClick={(e) => {
              if (!user) {
                e.preventDefault();
                navigate("/login");
                return;
              }
              e.preventDefault();
              setHeartFlash(true);
              setTimeout(() => {
                setHeartFlash(false);
                navigate("/wishlist");
              }, 150);
            }}
            className="relative flex items-center justify-center"
          >
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1 rounded-full">
                {wishlistCount}
              </span>
            )}
            {heartFlash ? (
              <FaHeart className="text-red-500 scale-110" />
            ) : (
              <FiHeart className="hover:opacity-70" />
            )}
          </NavLink>

          {/* CART */}
          <button
            onClick={() => {
              setCartFlash(true);
              setTimeout(() => {
                setCartFlash(false);
                navigate("/cart");
              }, 150);
            }}
            className="relative flex items-center justify-center"
          >
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] px-1 rounded-full">
                {cartCount}
              </span>
            )}
            <FiShoppingCart
              className={`transition ${
                cartFlash
                  ? "scale-125 animate-bounce"
                  : "hover:opacity-70"
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
