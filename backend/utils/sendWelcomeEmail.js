import nodemailer from "nodemailer";

export const sendWelcomeEmail = async (email) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"ARHOMESPACE" <${process.env.MAIL_USER}>`,
    to: email,
    subject: "Welcome to ARHOMESPACE 🏡",
    html: `
      <h2>Welcome to ARHOMESPACE</h2>
      <p>Thanks for joining our Home Inspiration Club.</p>
      <p>You’ll receive curated picks & exclusive offers.</p>
      <br/>
      <strong>— Team ARHOMESPACE</strong>
    `,
  });
};
