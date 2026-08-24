const express = require("express");

const {
  checkIn,
  checkOut,
  getMyAttendance,
  getAllAttendance,
} = require("../controller/attendanceController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

router.post("/check-in", authMiddleware, checkIn);
router.post("/check-out", authMiddleware, checkOut);
router.get("/me", authMiddleware, getMyAttendance);

// Admin-only: view all employees' attendance
router.get("/", authMiddleware, adminMiddleware, getAllAttendance);

module.exports = router;
