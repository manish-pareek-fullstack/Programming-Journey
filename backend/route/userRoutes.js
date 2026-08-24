const express = require("express");

const {
  signup,
  login,
  profile,
  logout,
  forgotPassword,
  verifyOTP,
  resetPassword,
} = require("../controller/userController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Authentication
router.post("/signup", signup);

router.post("/login", login);

router.get("/profile", authMiddleware, profile);

router.post("/logout", logout);

// Forgot Password
router.post("/forgot-password", forgotPassword);

router.post("/verify-otp", verifyOTP);

router.post("/reset-password", resetPassword);

module.exports = router;
