const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const cron = require("node-cron");

const app = express();

// ================== MIDDLEWARE ==================
app.use(cors());
app.use(express.json());

// ================== HEALTH CHECK ==================
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// ================== ROUTES ==================
const subscriptionRoutes = require("./routes/subscriptionRoutes");
const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes"); // ✅ protected

app.use("/api/subscriptions", subscriptionRoutes);
app.use("/api/auth", authRoutes);
app.use("/api", dashboardRoutes); // 🔐 protected routes

// ================== MODELS & UTILS ==================
const Subscription = require("./models/Subscription");
const sendEmail = require("./utils/sendEmail");

// ================== DB CONNECTION ==================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Database connected");
    console.log("🔥 CRON INITIALIZED (disabled)");

    // ================== CRON JOB (DISABLED) ==================
    /*
    cron.schedule("* * * * *", async () => {
      console.log("⏳ Checking subscriptions...");

      try {
        const subs = await Subscription.find().populate("user");

        const today = new Date();

        for (let sub of subs) {
          if (!sub.user || !sub.user.email) continue;

          const diff = Math.ceil(
            (new Date(sub.renewalDate) - today) / (1000 * 60 * 60 * 24)
          );

          if (diff === 1 && !sub.reminderSent) {
            await sendEmail(
              sub.user.email,
              "Subscription Expiry Alert ⚠️",
              `${sub.name} is expiring in 1 day!`
            );

            sub.reminderSent = true;
            await sub.save();

            console.log("📩 Email sent to:", sub.user.email);
          }
        }
      } catch (error) {
        console.error("❌ Cron error:", error.message);
      }
    });
    */
    // ========================================================
  })
  .catch((err) => console.log("❌ DB Error:", err));

// ================== SERVER START ==================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});