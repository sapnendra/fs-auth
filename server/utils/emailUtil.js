const nodemailer = require("nodemailer");

const sendVerificationEmail = async (to, token) => {
  // Create transporter lazily so production env vars (Render) are guaranteed
  // to be fully loaded before the transport is initialised.
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
  });

  const verificationUrl = `${process.env.CLIENT_URL || "http://localhost:3000"}/verify-email?token=${token}`;

  await transporter.sendMail({
    from: `"Auth App" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Verify your email address",
    html: `
      <div style="font-family: Poppins, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px; background: #f9f9f9; border-radius: 12px;">
        <h2 style="color: #E96326; font-family: 'Space Grotesk', sans-serif;">Verify Your Email</h2>
        <p style="color: #444;">Click the button below to verify your email address and activate your account.</p>
        <a href="${verificationUrl}" 
           style="display: inline-block; background: #E96326; color: white; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; margin-top: 16px;">
          Verify Email
        </a>
        <p style="color: #888; font-size: 12px; margin-top: 24px;">If you didn't create an account, you can safely ignore this email.</p>
      </div>
    `,
  });
};

module.exports = { sendVerificationEmail };
