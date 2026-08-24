const mongoose = require("mongoose");

const auditLogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Signup",
    },

    userName: {
      type: String,
      default: "System",
    },

    action: {
      // e.g. "created", "updated", "deleted", "approved", "rejected"
      type: String,
      required: true,
    },

    module: {
      // e.g. "Employee", "Department", "Project", "Task", "Leave"
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    targetId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("AuditLog", auditLogSchema);
