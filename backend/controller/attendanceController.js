const Attendance = require("../model/Attendance");
const Employee = require("../model/Employee");

// Normalize any date to midnight UTC (calendar day key)
const dayKey = (d = new Date()) => {
  const date = new Date(d);
  date.setUTCHours(0, 0, 0, 0);
  return date;
};

const getEmployeeForUser = async (req) => {
  return Employee.findOne({ email: req.user.email });
};

// ================= CHECK IN (logged-in employee) =================

const checkIn = async (req, res, next) => {
  try {
    const employee = await getEmployeeForUser(req);
    if (!employee) {
      return res.status(404).json({
        message: "No employee record linked to your account. Please contact admin.",
      });
    }

    const today = dayKey();

    const existing = await Attendance.findOne({ employee: employee._id, date: today });
    if (existing && existing.checkIn) {
      return res.status(400).json({ message: "You have already checked in today" });
    }

    const now = new Date();
    // Treat check-in after 10:30 AM local server time as "late" (simple, adjustable rule)
    const isLate = now.getUTCHours() > 10 || (now.getUTCHours() === 10 && now.getUTCMinutes() > 30);

    const record = existing
      ? Object.assign(existing, { checkIn: now, status: isLate ? "late" : "present" })
      : new Attendance({
          employee: employee._id,
          date: today,
          checkIn: now,
          status: isLate ? "late" : "present",
        });

    await record.save();

    res.status(200).json({ message: "Checked in successfully", data: record });
  } catch (error) {
    next(error);
  }
};

// ================= CHECK OUT (logged-in employee) =================

const checkOut = async (req, res, next) => {
  try {
    const employee = await getEmployeeForUser(req);
    if (!employee) {
      return res.status(404).json({
        message: "No employee record linked to your account. Please contact admin.",
      });
    }

    const today = dayKey();

    const record = await Attendance.findOne({ employee: employee._id, date: today });
    if (!record || !record.checkIn) {
      return res.status(400).json({ message: "You must check in before checking out" });
    }
    if (record.checkOut) {
      return res.status(400).json({ message: "You have already checked out today" });
    }

    const now = new Date();
    record.checkOut = now;

    const hours = (now - record.checkIn) / (1000 * 60 * 60);
    record.workingHours = Math.round(hours * 100) / 100;

    if (record.workingHours > 0 && record.workingHours < 4) {
      record.status = "half-day";
    }

    await record.save();

    res.status(200).json({ message: "Checked out successfully", data: record });
  } catch (error) {
    next(error);
  }
};

// ================= MY ATTENDANCE HISTORY (logged-in employee) =================

const getMyAttendance = async (req, res, next) => {
  try {
    const employee = await getEmployeeForUser(req);
    if (!employee) {
      return res.status(404).json({ message: "No employee record linked to your account" });
    }

    const { month, year } = req.query;

    const query = { employee: employee._id };

    if (month && year) {
      const start = new Date(Date.UTC(Number(year), Number(month) - 1, 1));
      const end = new Date(Date.UTC(Number(year), Number(month), 1));
      query.date = { $gte: start, $lt: end };
    }

    const records = await Attendance.find(query).sort({ date: -1 });

    const summary = records.reduce(
      (acc, r) => {
        acc[r.status] = (acc[r.status] || 0) + 1;
        acc.totalHours += r.workingHours || 0;
        return acc;
      },
      { present: 0, absent: 0, late: 0, "half-day": 0, totalHours: 0 },
    );

    res.status(200).json({
      message: "Attendance fetched successfully",
      data: records,
      summary,
    });
  } catch (error) {
    next(error);
  }
};

// ================= ALL ATTENDANCE (admin only) =================

const getAllAttendance = async (req, res, next) => {
  try {
    const { employeeId, month, year, status, page = 1, limit = 10 } = req.query;

    const query = {};
    if (employeeId) query.employee = employeeId;
    if (status) query.status = status;

    if (month && year) {
      const start = new Date(Date.UTC(Number(year), Number(month) - 1, 1));
      const end = new Date(Date.UTC(Number(year), Number(month), 1));
      query.date = { $gte: start, $lt: end };
    }

    const pageNum = Math.max(parseInt(page) || 1, 1);
    const limitNum = Math.max(parseInt(limit) || 10, 1);
    const skip = (pageNum - 1) * limitNum;

    const [records, total] = await Promise.all([
      Attendance.find(query)
        .populate("employee", "name email")
        .sort({ date: -1 })
        .skip(skip)
        .limit(limitNum),
      Attendance.countDocuments(query),
    ]);

    res.status(200).json({
      message: "Attendance fetched successfully",
      data: records,
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

module.exports = {
  checkIn,
  checkOut,
  getMyAttendance,
  getAllAttendance,
};
