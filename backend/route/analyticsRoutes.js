const express = require("express");

const { getDashboardStats, getRecentActivity } = require("../controller/analyticsController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

router.get("/dashboard", authMiddleware, adminMiddleware, getDashboardStats);
router.get("/recent-activity", authMiddleware, adminMiddleware, getRecentActivity);

module.exports = router;
