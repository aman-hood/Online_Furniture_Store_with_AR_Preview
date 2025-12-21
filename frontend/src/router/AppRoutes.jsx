import { Routes, Route } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";

import HomePage from "../pages/HomePage";
import ShopPage from "../pages/ShopPage";
import ProductPage from "../pages/ProductPage";
import BlogList from "../pages/blog/BlogList";
import BlogGrid from "../pages/blog/BlogGrid";
import BlogPost from "../pages/blog/BlogPost";
import Search from "../pages/Search";
import ProductInfo from "../pages/product/ProductInfo";
import CareWarranty from "../pages/product/CareWarranty";
import Help from "../pages/product/Help";

import AboutPage from "../pages/AboutPage";
import ContactPage from "../pages/ContactPage";
import FAQPage from "../pages/FAQPage";
import PrivacyPolicyPage from "../pages/PrivacyPolicyPage";
import TermsPage from "../pages/TermsPage";
import SupportPage from "../pages/SupportPage";
import GiftCardsPage from "../pages/GiftCardsPage";
import Checkout from "../pages/Checkout";
import GiftCardSuccess from "../pages/GiftCardSuccess";
import Refund from "../pages/RefundPolicyPage";
import Shipping from "../pages/ShippingPolicyPage";

import ProfilePage from "../pages/account/AccountPage";
import OrdersPage from "../pages/OrdersPage";
import TrackOrderPage from "../pages/TrackOrderPage";

import Collections from "../pages/Collections";
import CategoryPage from "../pages/CategoryPage";
import ProductDetailPage from "../pages/ProductDetailPage";
import WishlistPage from "../pages/WishlistPage";
import CartPage from "../pages/CartPage";

import ShopByRoomPage from "../pages/ShopByRoomPage";

import AdminProducts from "../pages/AdminProducts";
import ProductForm from "../components/admin/ProductForm";

import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ForgotPasswordPage from "../components/auth/ForgotPasswordPage";
import OTPPage from "../components/auth/OTPPage";
import ResetPasswordPage from "../components/auth/ResetPasswordPage";
import ResetSuccessPage from "../components/auth/ResetSuccessPage";
import VerifyEmail from "../components/auth/VerifyEmail";
import VerifyPendingPage from "../components/auth/VerifyPendingPage";

const AppRoutes = () => {
  return (
    <Routes>

      {/* 🌍 GLOBAL LAYOUT (Navbar + TopBar on all these pages) */}
      <Route element={<MainLayout />}>

        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/product/:id" element={<ProductPage />} />

        <Route path="/shop/:room" element={<ShopByRoomPage />} />

        {/* Blog */}
        <Route path="/blog" element={<BlogList />} />
        <Route path="/blog/grid" element={<BlogGrid />} />
        <Route path="/blog/:slug" element={<BlogPost />} />

        <Route path="/search" element={<Search />} />
        <Route path="/product-info" element={<ProductInfo />} />
        <Route path="/care-warranty" element={<CareWarranty />} />
        <Route path="/help" element={<Help />} />

        {/* Info Pages */}
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/gift-cards" element={<GiftCardsPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/gift-card/success" element={<GiftCardSuccess />} />
        <Route path="/refund" element={<Refund />} />
        <Route path="/shipping" element={<Shipping />} />

        {/* Account / Orders */}
        <Route path="/account" element={<ProfilePage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/track" element={<TrackOrderPage />} />

        {/* Collections */}
        <Route path="/collections" element={<Collections />} />
        <Route path="/collections/:category" element={<CategoryPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} /> 

        {/* Wishlist / Cart */}
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/cart" element={<CartPage />} />

        {/* Admin */}
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/admin/products/new" element={<ProductForm />} />
        <Route path="/admin/products/:id/edit" element={<ProductForm />} />

      </Route> {/* ✅ CLOSED PROPERLY */}

      {/* 🔐 AUTH ROUTES (NO NAVBAR) */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/otp/:email" element={<OTPPage />} />
      <Route path="/reset-password/:email" element={<ResetPasswordPage />} />
      <Route path="/reset-success" element={<ResetSuccessPage />} />
      <Route path="/verify/:token" element={<VerifyEmail />} />
      <Route path="/verify-pending/:email" element={<VerifyPendingPage />} />

    </Routes>
  );
};

export default AppRoutes;
