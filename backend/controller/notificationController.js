const Notification = require("../model/Notification");

// ================= MY NOTIFICATIONS (logged-in user) =================

const getMyNotifications = async (req, res, next) => {
  try {
    const { page = 1, limit = 20 } = req.query;

    const pageNum = Math.max(parseInt(page) || 1, 1);
    const limitNum = Math.max(parseInt(limit) || 20, 1);
    const skip = (pageNum - 1) * limitNum;

    const [notifications, total, unreadCount] = await Promise.all([
      Notification.find({ user: req.user.userId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum),
      Notification.countDocuments({ user: req.user.userId }),
      Notification.countDocuments({ user: req.user.userId, isRead: false }),
    ]);

    res.status(200).json({
      message: "Notifications fetched successfully",
      data: notifications,
      unreadCount,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum) || 1,
      },
    });
  } catch (error) {
    next(error);
  }
};

// ================= MARK ONE AS READ =================

const markAsRead = async (req, res, next) => {
  try {
    const { id } = req.params;

    const notification = await Notification.findOneAndUpdate(
      { _id: id, user: req.user.userId },
      { $set: { isRead: true } },
      { new: true },
    );

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    res.status(200).json({ message: "Notification marked as read", data: notification });
  } catch (error) {
    next(error);
  }
};

// ================= MARK ALL AS READ =================

const markAllAsRead = async (req, res, next) => {
  try {
    await Notification.updateMany(
      { user: req.user.userId, isRead: false },
      { $set: { isRead: true } },
    );

    res.status(200).json({ message: "All notifications marked as read" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getMyNotifications,
  markAsRead,
  markAllAsRead,
};
