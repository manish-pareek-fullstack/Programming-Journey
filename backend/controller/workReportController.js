const WorkReport = require("../model/WorkReport");
const Employee = require("../model/Employee");
const Signup = require("../model/Signup");
const notify = require("../utils/notify");

const dayKey = (d = new Date()) => {
  const date = new Date(d);
  date.setUTCHours(0, 0, 0, 0);
  return date;
};

// ================= SUBMIT DAILY WORK REPORT (logged-in employee) =================

const submitReport = async (req, res, next) => {
  try {
    const { date, hoursWorked, completedWork, blockers, nextDayPlan } = req.body;

    if (hoursWorked === undefined || !completedWork) {
      return res.status(400).json({
        message: "hoursWorked and completedWork are required",
      });
    }

    const employee = await Employee.findOne({ email: req.user.email });
    if (!employee) {
      return res.status(404).json({
        message: "No employee record linked to your account. Please contact admin.",
      });
    }

    const reportDate = dayKey(date || new Date());

    const existing = await WorkReport.findOne({ employee: employee._id, date: reportDate });

    const payload = {
      hoursWorked,
      completedWork,
      blockers: blockers || "",
      nextDayPlan: nextDayPlan || "",
      reviewStatus: "pending",
    };

    let record;
    if (existing) {
      Object.assign(existing, payload);
      record = await existing.save();
    } else {
      record = await WorkReport.create({
        employee: employee._id,
        date: reportDate,
        ...payload,
      });
    }

    res.status(200).json({ message: "Work report submitted successfully", data: record });
  } catch (error) {
    next(error);
  }
};

// ================= MY REPORTS (logged-in employee) =================

const getMyReports = async (req, res, next) => {
  try {
    const employee = await Employee.findOne({ email: req.user.email });
    if (!employee) {
      return res.status(404).json({ message: "No employee record linked to your account" });
    }

    const reports = await WorkReport.find({ employee: employee._id }).sort({ date: -1 });

    res.status(200).json({ message: "Work reports fetched successfully", data: reports });
  } catch (error) {
    next(error);
  }
};

// ================= ALL REPORTS (admin only) =================

const getAllReports = async (req, res, next) => {
  try {
    const { employeeId, reviewStatus, page = 1, limit = 10 } = req.query;

    const query = {};
    if (employeeId) query.employee = employeeId;
    if (reviewStatus) query.reviewStatus = reviewStatus;

    const pageNum = Math.max(parseInt(page) || 1, 1);
    const limitNum = Math.max(parseInt(limit) || 10, 1);
    const skip = (pageNum - 1) * limitNum;

    const [reports, total] = await Promise.all([
      WorkReport.find(query)
        .populate("employee", "name email")
        .sort({ date: -1 })
        .skip(skip)
        .limit(limitNum),
      WorkReport.countDocuments(query),
    ]);

    res.status(200).json({
      message: "Work reports fetched successfully",
      data: reports,
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

// ================= ADD MANAGER COMMENT (admin only) =================

const reviewReport = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { managerComments } = req.body;

    const report = await WorkReport.findById(id).populate("employee", "name email");
    if (!report) {
      return res.status(404).json({ message: "Work report not found" });
    }

    report.managerComments = managerComments || "";
    report.reviewStatus = "reviewed";
    await report.save();

    const signupUser = await Signup.findOne({ email: report.employee.email });
    await notify({
      user: signupUser?._id,
      type: "work-report",
      title: "Work report reviewed",
      message: "Your manager has reviewed your daily work report.",
      relatedId: report._id,
      relatedModel: "WorkReport",
    });

    res.status(200).json({ message: "Work report reviewed successfully", data: report });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  submitReport,
  getMyReports,
  getAllReports,
  reviewReport,
};
