const express = require("express");
const router = express.Router();
const Subscription = require("../models/Subscription");
const auth = require("../middleware/authMiddleware");
const sendEmail = require("../utils/sendEmail");
const User = require("../models/User");


// ➕ 1. Add Subscription
router.post("/add", auth, async (req, res) => {
  try {
    const newSub = new Subscription({
      ...req.body,
      user: req.user.id,
    });

    await newSub.save();

    res.status(201).json({
      message: "Subscription added successfully",
      data: newSub,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// 📄 2. Get All Subscriptions
router.get("/", auth, async (req, res) => {
  try {
    const subs = await Subscription.find({ user: req.user.id });
    res.json(subs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// 🔍 3. Get by Category
router.get("/category/:type", auth, async (req, res) => {
  try {
    const data = await Subscription.find({
      user: req.user.id,
      category: req.params.type,
    });

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// ⏰ 4. Expiring Soon + EMAIL ALERT (FIXED)
router.get("/expiring-soon", auth, async (req, res) => {
  try {
    const today = new Date();
    const next7Days = new Date();
    next7Days.setDate(today.getDate() + 7);

    const subs = await Subscription.find({
      user: req.user.id,
      renewalDate: {
        $gte: today,
        $lte: next7Days,
      },
    });

    const user = await User.findById(req.user.id);

    for (let sub of subs) {
      const daysLeft = Math.ceil(
        (new Date(sub.renewalDate) - today) / (1000 * 60 * 60 * 24)
      );

      // ✅ SEND ONLY ONCE
      if (daysLeft > 0 && daysLeft <= sub.reminderDaysBefore && !sub.reminderSent) {
        
        await sendEmail(
          user.email,
          "Subscription Expiry Alert ⚠️",
          `${sub.name} is expiring in ${daysLeft} day(s)!`
        );

        // ✅ mark as sent
        sub.reminderSent = true;
        await sub.save();
      }
    }

    res.json({
      message: "Checked subscriptions & emails sent if needed",
      data: subs,
    });

  } catch (error) {
    console.log("❌ Error:", error.message);
    res.status(500).json({ error: error.message });
  }
});


// 💸 5. Total Expense
router.get("/total-expense", auth, async (req, res) => {
  try {
    const subs = await Subscription.find({ user: req.user.id });

    const total = subs.reduce((sum, item) => sum + (item.price || 0), 0);

    res.json({ totalExpense: total });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// ✏️ 6. Update Subscription
router.put("/:id", auth, async (req, res) => {
  try {
    const sub = await Subscription.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );

    if (!sub) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    res.json({
      message: "Updated successfully",
      data: sub,
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// ❌ 7. Delete Subscription
router.delete("/:id", auth, async (req, res) => {
  try {
    const sub = await Subscription.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!sub) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    res.json({ message: "Deleted successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;