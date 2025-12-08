import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ShopPage from "../pages/ShopPage";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ForgotPasswordPage from "../components/auth/ForgotPasswordPage";
// import Signup from "../pages/Signup";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<HomePage />} />
        
        <Route path="/shop" element={<ShopPage />} />
        
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
