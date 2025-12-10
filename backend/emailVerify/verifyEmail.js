import nodemailer from "nodemailer";
import "dotenv/config";


export const verifyEmail = (token, email) => {

  const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});


  const mailConfigurations = {
    from: process.env.MAIL_USER,
    to: email,
    subject: "Email Verification",
    text: `Hi there!

Please verify your email by clicking the link below:

${process.env.FRONTEND_URL}/verify/${token}

If you didn't request this, ignore this mail.

Thanks!`,
  };

  transporter.sendMail(mailConfigurations, (error, info) => {
    if (error) {
      console.log("MAIL ERROR:", error);
      return;
    }
    console.log("Email sent:", info.response);
  });
};
