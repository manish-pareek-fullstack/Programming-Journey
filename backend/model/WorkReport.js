const mongoose = require("mongoose");

const workReportSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    hoursWorked: {
      type: Number,
      required: true,
      min: 0,
    },

    completedWork: {
      type: String,
      required: true,
      trim: true,
    },

    blockers: {
      type: String,
      trim: true,
      default: "",
    },

    nextDayPlan: {
      type: String,
      trim: true,
      default: "",
    },

    managerComments: {
      type: String,
      trim: true,
      default: "",
    },

    reviewStatus: {
      type: String,
      enum: ["pending", "reviewed"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  },
);

// One report per employee per day
workReportSchema.index({ employee: 1, date: 1 }, { unique: true });

module.exports = mongoose.model("WorkReport", workReportSchema);
