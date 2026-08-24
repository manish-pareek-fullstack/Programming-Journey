const express = require("express");

const {
  submitReport,
  getMyReports,
  getAllReports,
  reviewReport,
} = require("../controller/workReportController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

router.post("/", authMiddleware, submitReport);
router.get("/me", authMiddleware, getMyReports);

router.get("/", authMiddleware, adminMiddleware, getAllReports);
router.patch("/:id/review", authMiddleware, adminMiddleware, reviewReport);

module.exports = router;
