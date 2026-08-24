const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },

    date: {
      // Stored as midnight UTC for the calendar day, used to prevent
      // duplicate check-ins for the same day.
      type: Date,
      required: true,
    },

    checkIn: {
      type: Date,
      default: null,
    },

    checkOut: {
      type: Date,
      default: null,
    },

    status: {
      type: String,
      enum: ["present", "absent", "late", "half-day"],
      default: "present",
    },

    workingHours: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

// One attendance record per employee per day
attendanceSchema.index({ employee: 1, date: 1 }, { unique: true });

module.exports = mongoose.model("Attendance", attendanceSchema);
