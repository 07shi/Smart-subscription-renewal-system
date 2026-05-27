const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");

// 🔐 Protected route
router.get("/dashboard", auth, (req, res) => {
  res.json({
    message: "Dashboard accessed successfully",
    user: req.user,
  });
});

module.exports = router;