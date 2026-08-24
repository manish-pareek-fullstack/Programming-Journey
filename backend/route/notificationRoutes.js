const express = require("express");

const {
  getMyNotifications,
  markAsRead,
  markAllAsRead,
} = require("../controller/notificationController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, getMyNotifications);
router.patch("/:id/read", authMiddleware, markAsRead);
router.patch("/read-all", authMiddleware, markAllAsRead);

module.exports = router;
