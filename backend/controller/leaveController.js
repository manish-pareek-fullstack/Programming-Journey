const Leave = require("../model/Leave");
const Employee = require("../model/Employee");
const Signup = require("../model/Signup");
const notify = require("../utils/notify");
const logAudit = require("../utils/auditLogger");

// ================= APPLY LEAVE (logged-in employee) =================

const applyLeave = async (req, res, next) => {
  try {
    const { leaveType, startDate, endDate, reason } = req.body;

    if (!startDate || !endDate || !reason) {
      return res.status(400).json({
        message: "startDate, endDate and reason are required",
      });
    }

    const employee = await Employee.findOne({ email: req.user.email });
    if (!employee) {
      return res.status(404).json({
        message: "No employee record linked to your account. Please contact admin.",
      });
    }

    const data = await Leave.create({
      employee: employee._id,
      leaveType: leaveType || "casual",
      startDate,
      endDate,
      reason,
    });

    await logAudit({
      user: req.user,
      action: "applied",
      module: "Leave",
      description: `${employee.name} applied for leave`,
      targetId: data._id,
    });

    res.status(201).json({ message: "Leave application submitted", data });
  } catch (error) {
    next(error);
  }
};

// ================= MY LEAVES (logged-in employee) =================

const getMyLeaves = async (req, res, next) => {
  try {
    const employee = await Employee.findOne({ email: req.user.email });
    if (!employee) {
      return res.status(404).json({ message: "No employee record linked to your account" });
    }

    const leaves = await Leave.find({ employee: employee._id }).sort({ createdAt: -1 });

    res.status(200).json({ message: "Leaves fetched successfully", data: leaves });
  } catch (error) {
    next(error);
  }
};

// ================= ALL LEAVES (admin only) =================

const getAllLeaves = async (req, res, next) => {
  try {
    const { status, employeeId, page = 1, limit = 10 } = req.query;

    const query = {};
    if (status) query.status = status;
    if (employeeId) query.employee = employeeId;

    const pageNum = Math.max(parseInt(page) || 1, 1);
    const limitNum = Math.max(parseInt(limit) || 10, 1);
    const skip = (pageNum - 1) * limitNum;

    const [leaves, total] = await Promise.all([
      Leave.find(query)
        .populate("employee", "name email")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum),
      Leave.countDocuments(query),
    ]);

    res.status(200).json({
      message: "Leaves fetched successfully",
      data: leaves,
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

// ================= APPROVE / REJECT LEAVE (admin only) =================

const reviewLeave = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, reviewComment } = req.body;

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "status must be 'approved' or 'rejected'" });
    }

    const leave = await Leave.findById(id).populate("employee", "name email");
    if (!leave) {
      return res.status(404).json({ message: "Leave request not found" });
    }

    leave.status = status;
    leave.reviewComment = reviewComment || "";
    leave.reviewedBy = req.user.userId;
    await leave.save();

    const signupUser = await Signup.findOne({ email: leave.employee.email });
    await notify({
      user: signupUser?._id,
      type: "leave-status",
      title: `Leave ${status}`,
      message: `Your leave request has been ${status}.`,
      relatedId: leave._id,
      relatedModel: "Leave",
    });

    await logAudit({
      user: req.user,
      action: status,
      module: "Leave",
      description: `Leave request for ${leave.employee.name} was ${status}`,
      targetId: leave._id,
    });

    res.status(200).json({ message: `Leave ${status} successfully`, data: leave });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  applyLeave,
  getMyLeaves,
  getAllLeaves,
  reviewLeave,
};
