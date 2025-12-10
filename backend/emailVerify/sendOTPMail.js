// emailVerify/sendOTPMail.js
import nodemailer from "nodemailer";
import "dotenv/config";

export const sendOTPMail = async (otp, email) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER, // your Gmail
        pass: process.env.MAIL_PASS, // APP PASSWORD (not normal Gmail pass)
      },
    });

    const mailConfigurations = {
      from: process.env.MAIL_USER,
      to: email,
      subject: "Password Reset OTP",
      html: `<p>Your OTP for password reset is: <b>${otp}</b></p>
             <p>This OTP expires in 10 minutes.</p>`,
    };

    // Use promise-style API and await it so errors can be caught
    const info = await transporter.sendMail(mailConfigurations);
    console.log("OTP Sent Successfully:", info.response || info);
    return info;
  } catch (error) {
    console.error("❌ sendOTPMail error:", error);
    // don't throw raw error objects that could reveal sensitive info to clients;
    // but throw so controller can handle and return 500
    throw new Error("Failed to send OTP email");
  }
};
