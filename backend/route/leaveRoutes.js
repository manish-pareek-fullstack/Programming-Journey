const express = require("express");

const {
  applyLeave,
  getMyLeaves,
  getAllLeaves,
  reviewLeave,
} = require("../controller/leaveController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

router.post("/", authMiddleware, applyLeave);
router.get("/me", authMiddleware, getMyLeaves);

router.get("/", authMiddleware, adminMiddleware, getAllLeaves);
router.patch("/:id/review", authMiddleware, adminMiddleware, reviewLeave);

module.exports = router;
