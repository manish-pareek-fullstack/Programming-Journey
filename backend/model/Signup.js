const mongoose = require("mongoose");

const signupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    // Role based access control
    // Normal signup ALWAYS creates "employee".
    // "admin" can only be set directly in the database (see backend/seedAdmin.js)
    role: {
      type: String,
      enum: ["admin", "employee"],
      default: "employee",
    },

    // Password reset fields
    resetOtpHash: {
      type: String,
      default: null,
    },

    resetOtpExpiresAt: {
      type: Date,
      default: null,
    },

    resetOtpAttempts: {
      type: Number,
      default: 0,
    },

    resetOtpLastSentAt: {
      type: Date,
      default: null,
    },

    resetTokenHash: {
      type: String,
      default: null,
    },

    resetTokenExpiresAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Signup", signupSchema);
