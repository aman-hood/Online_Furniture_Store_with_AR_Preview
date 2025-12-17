import http from "./http";

const API = "/api/users";



// 🔹 Login
export const loginUser = async (email, password) => {
  try {
    const res = await http.post(`${API}/login`, { email, password });
    return res.data;
  } catch (err) {
    console.log("AXIOS LOGIN ERROR:", err);
    throw err;
  }
};


// 🔹 Register
export const registerUser = async (data) => {
  // data = { firstName, lastName, email, password }
  const res = await http.post(`${API}/register`, data);
  return res.data;
};

// 🔹 Forgot Password → sends OTP email
export const forgotPassword = async (email) => {
  const res = await http.post(`${API}/forgot-password`, { email });
  return res.data;
};

// 🔹 Verify OTP
export const verifyOTP = async (email, otp) => {
  const res = await http.post(`${API}/verify-otp/${email}`, { otp });
  return res.data;
};
// Reverify
export const reVerifyEmail = async (email) => {
  const res = await http.post(`${API}/reVerify`, { email });
  return res.data;
};
// 🔹 Reset Password (after OTP verification)
export const resetPassword = async (email, newPassword, confirmPassword) => {
  const res = await http.post(`${API}/change-password/${email}`, {
    newPassword,
    confirmPassword,
  });
  return res.data;
};
