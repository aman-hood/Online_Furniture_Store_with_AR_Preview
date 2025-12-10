import axios from "axios";

const API = "http://localhost:8000/api/users";



// 🔹 Login
export const loginUser = async (email, password) => {
  try {
    const res = await axios.post(`${API}/login`,
      { email, password },
      { withCredentials: true }
    );
    return res.data;
  } catch (err) {
    console.log("AXIOS LOGIN ERROR:", err);
    throw err;
  }
};


// 🔹 Register
export const registerUser = async (data) => {
  // data = { firstName, lastName, email, password }
  const res = await axios.post(`${API}/register`, data);
  return res.data;
};

// 🔹 Forgot Password → sends OTP email
export const forgotPassword = async (email) => {
  const res = await axios.post(`${API}/forgot-password`, { email });
  return res.data;
};

// 🔹 Verify OTP
export const verifyOTP = async (email, otp) => {
  const res = await axios.post(`${API}/verify-otp/${email}`, { otp });
  return res.data;
};
// Reverify
export const reVerifyEmail = async (email) => {
  const res = await axios.post(`${API}/reVerify`, { email });
  return res.data;
};
// 🔹 Reset Password (after OTP verification)
export const resetPassword = async (email, newPassword, confirmPassword) => {
  const res = await axios.post(`${API}/change-password/${email}`, {
    newPassword,
    confirmPassword,
  });
  return res.data;
};
