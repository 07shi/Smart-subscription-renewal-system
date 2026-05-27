const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    name: {
        type: String,
        required: true
    },

    category: {
        type: String,
        enum: [
            "OTT",
            "Software",
            "Cloud",
            "Bills",
            "Education",
            "Membership",
            "Vehicle",
            "Documents",
            "Finance",

            // ✅ NEW CATEGORIES ADDED
            "Groceries",
            "Medicines",
            "Gadgets"
        ],
        required: true
    },

    // Optional sub-type (good for future features)
    subCategory: {
        type: String
    },

    price: {
        type: Number,
        default: 0
    },

    billingCycle: {
        type: String,
        enum: ["monthly", "yearly", "one-time"],
        default: "monthly"
    },

    renewalDate: {
        type: Date,
        required: true
    },

    dueDate: {
        type: Date
    },

    reminderDaysBefore: {
        type: Number,
        default: 2
    },

    notes: {
        type: String
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    // ✅ Prevent duplicate emails
    reminderSent: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model("Subscription", subscriptionSchema);