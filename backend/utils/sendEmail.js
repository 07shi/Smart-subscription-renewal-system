const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, text) => {
  try {
    console.log("👉 EMAIL_USER:", process.env.EMAIL_USER);
    console.log("👉 EMAIL_PASS:", process.env.EMAIL_PASS ? "Loaded ✅" : "Missing ❌");
    console.log("👉 Sending email to:", to);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // ✅ verify connection before sending
    await transporter.verify();
    console.log("✅ SMTP connection ready");

    const mailOptions = {
      from: `"Subscription Tracker" <${process.env.EMAIL_USER}>`, // ✅ better format
      to,
      subject,
      text,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("✅ Email sent:", info.response);
  } catch (error) {
    console.log("❌ Email error:", error.message);
  }
};

module.exports = sendEmail;