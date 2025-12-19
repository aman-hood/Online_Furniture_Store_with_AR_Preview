import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ShopPage from "../pages/ShopPage";
import ProductPage from "../pages/ProductPage";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ForgotPasswordPage from "../components/auth/ForgotPasswordPage";
import OTPPage from "../components/auth/OTPPage";
import ResetSuccessPage from "../components/auth/ResetSuccessPage";
import VerifyEmail from "../components/auth/VerifyEmail";
import VerifyPendingPage from "../components/auth/VerifyPendingPage";
import ResetPasswordPage from "../components/auth/ResetPasswordPage";
import WishlistPage from "../pages/WishlistPage";
import Collections from "../pages/Collections";
import CategoryPage from "../pages/CategoryPage";
import CartPage from "../pages/CartPage";
import ProfilePage from "../pages/account/AccountPage";
import AdminProducts from "../pages/AdminProducts";
import ProductForm from "../components/admin/ProductForm";
import BlogList from "../pages/blog/BlogList";
import BlogGrid from "../pages/blog/BlogGrid";
import BlogPost from "../pages/blog/BlogPost";
import AboutPage from "../pages/AboutPage";
import ContactPage from "../pages/ContactPage";
import FAQPage from "../pages/FAQPage";
import PrivacyPolicyPage from "../pages/PrivacyPolicyPage";
import TermsPage from "../pages/TermsPage";
import OrdersPage from "../pages/OrdersPage";
import TrackOrderPage from "../pages/TrackOrderPage";
import SupportPage from "../pages/SupportPage";
import GiftCardsPage from "../pages/GiftCardsPage";
import Checkout from "../pages/Checkout";
import GiftCardSuccess from "../pages/GiftCardSuccess";
import Search from "../pages/Search";
import Shipping from "../pages/ShippingPolicyPage";
import Refund from "../pages/RefundPolicyPage";
import ProductInfo from "../pages/product/ProductInfo"
import CareWarranty from "../pages/product/CareWarranty"
import Help from "../pages/product/Help"



const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/shop" element={<ShopPage />} />
      <Route path="/product/:id" element={<ProductPage />} />
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
      <Route path="/support" element={<SupportPage />} />
      <Route path="/gift-cards" element={<GiftCardsPage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/gift-card/success" element={<GiftCardSuccess />} />
      <Route path="/refund" element={<Refund />} />
      <Route path="/shipping" element={<Shipping />} />
      {/* Account/Orders */}
      <Route path="/account" element={<ProfilePage />} />
      <Route path="/orders" element={<OrdersPage />} />
      <Route path="/track" element={<TrackOrderPage />} />
      {/* auth */}
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/verify/:token" element={<VerifyEmail />} />
      <Route path="/verify-pending/:email" element={<VerifyPendingPage />} />
      
      {/* forget password */}
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/otp/:email" element={<OTPPage />} />
      <Route path="/reset-password/:email" element={<ResetPasswordPage />} />
      <Route path="/reset-success" element={<ResetSuccessPage />} />

      {/* Product Page */}
      <Route path="/collections" element={<Collections />} />
      <Route path="/collections/:category" element={<CategoryPage />} />

      {/* WishlistPage */}
      <Route path="/wishlist" element={<WishlistPage />} />

      {/* Cart & Profile */}
      <Route path="/cart" element={<CartPage />} />
      <Route path="/profile" element={<ProfilePage />} />

      {/* Admin */}
      <Route path="/admin/products" element={<AdminProducts />} />
      <Route path="/admin/products/new" element={<ProductForm />} />
      <Route path="/admin/products/:id/edit" element={<ProductForm />} />

    </Routes>
  );
};

export default AppRoutes;
