const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    user: {
      // Signup._id of the person who should see this notification
      type: mongoose.Schema.Types.ObjectId,
      ref: "Signup",
      required: true,
    },

    type: {
      type: String,
      enum: [
        "task-assigned",
        "leave-status",
        "work-report",
        "upcoming-task",
        "overdue-task",
        "general",
      ],
      default: "general",
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    isRead: {
      type: Boolean,
      default: false,
    },

    relatedId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },

    relatedModel: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Notification", notificationSchema);
