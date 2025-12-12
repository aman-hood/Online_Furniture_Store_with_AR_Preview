import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ShopPage from "../pages/ShopPage";
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

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
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

    </Routes>
  );
};

export default AppRoutes;
