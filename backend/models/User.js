const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,        // ✅ must have name
      trim: true,
    },
    email: {
      type: String,
      required: true,        // ✅ must have email
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,        // ✅ must have password
    },
  },
  {
    timestamps: true,        // ✅ adds createdAt & updatedAt
  }
);

module.exports = mongoose.model("User", userSchema);