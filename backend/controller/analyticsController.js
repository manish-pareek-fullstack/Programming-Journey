const Employee = require("../model/Employee");
const Department = require("../model/Department");
const Project = require("../model/Project");
const Task = require("../model/Task");
const Leave = require("../model/Leave");
const Attendance = require("../model/Attendance");
const WorkReport = require("../model/WorkReport");
const AuditLog = require("../model/AuditLog");

const dayKey = (d = new Date()) => {
  const date = new Date(d);
  date.setUTCHours(0, 0, 0, 0);
  return date;
};

// ================= DASHBOARD ANALYTICS (real DB data, admin only) =================

const getDashboardStats = async (req, res, next) => {
  try {
    const today = dayKey();

    const [
      totalEmployees,
      activeEmployees,
      inactiveEmployees,
      totalDepartments,
      totalProjects,
      totalTasks,
      completedTasks,
      pendingLeaves,
      todayAttendanceCount,
      attendanceByStatus,
      tasksByStatus,
      leavesByStatus,
      employeesByDepartment,
    ] = await Promise.all([
      Employee.countDocuments(),
      Employee.countDocuments({ status: "active" }),
      Employee.countDocuments({ status: "inactive" }),
      Department.countDocuments(),
      Project.countDocuments(),
      Task.countDocuments(),
      Task.countDocuments({ status: "completed" }),
      Leave.countDocuments({ status: "pending" }),
      Attendance.countDocuments({ date: today }),
      Attendance.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }]),
      Task.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }]),
      Leave.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }]),
      Employee.aggregate([
        {
          $lookup: {
            from: "departments",
            localField: "department",
            foreignField: "_id",
            as: "dept",
          },
        },
        { $unwind: { path: "$dept", preserveNullAndEmptyArrays: true } },
        {
          $group: {
            _id: { $ifNull: ["$dept.name", "Unassigned"] },
            count: { $sum: 1 },
          },
        },
        { $sort: { count: -1 } },
      ]),
    ]);

    const toChartArray = (agg) => agg.map((a) => ({ name: a._id, value: a.count }));

    res.status(200).json({
      message: "Dashboard analytics fetched successfully",
      data: {
        cards: {
          totalEmployees,
          activeEmployees,
          inactiveEmployees,
          totalDepartments,
          totalProjects,
          totalTasks,
          completedTasks,
          pendingLeaves,
          todayAttendance: todayAttendanceCount,
        },
        charts: {
          attendanceByStatus: toChartArray(attendanceByStatus),
          tasksByStatus: toChartArray(tasksByStatus),
          leavesByStatus: toChartArray(leavesByStatus),
          employeesByDepartment: toChartArray(employeesByDepartment),
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

// ================= RECENT ACTIVITY (admin only) =================

const getRecentActivity = async (req, res, next) => {
  try {
    const [
      recentEmployees,
      recentProjects,
      recentTasks,
      recentLeaves,
      recentWorkReports,
      pendingLeaves,
      overdueTasks,
    ] = await Promise.all([
      Employee.find().sort({ createdAt: -1 }).limit(5).select("name email createdAt"),
      Project.find().sort({ createdAt: -1 }).limit(5).select("name status createdAt"),
      Task.find().sort({ createdAt: -1 }).limit(5).populate("assignedTo", "name").select("title status createdAt assignedTo"),
      Leave.find().sort({ createdAt: -1 }).limit(5).populate("employee", "name").select("status createdAt employee"),
      WorkReport.find().sort({ createdAt: -1 }).limit(5).populate("employee", "name").select("date reviewStatus createdAt employee"),
      Leave.countDocuments({ status: "pending" }),
      Task.countDocuments({ status: { $ne: "completed" }, deadline: { $lt: new Date() } }),
    ]);

    res.status(200).json({
      message: "Recent activity fetched successfully",
      data: {
        recentEmployees,
        recentProjects,
        recentTasks,
        recentLeaves,
        recentWorkReports,
        pendingActions: {
          pendingLeaves,
          overdueTasks,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDashboardStats,
  getRecentActivity,
};
