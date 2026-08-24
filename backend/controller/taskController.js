const Task = require("../model/Task");
const Employee = require("../model/Employee");
const Signup = require("../model/Signup");
const logAudit = require("../utils/auditLogger");
const notify = require("../utils/notify");

// Small helper: find the Signup account linked to an Employee record
// (they are linked by email - see employeeController.getMyProfile)
const findSignupIdForEmployee = async (employeeId) => {
  const employee = await Employee.findById(employeeId);
  if (!employee) return null;
  const signupUser = await Signup.findOne({ email: employee.email });
  return signupUser ? signupUser._id : null;
};

// ================= CREATE TASK (admin only) =================

const createTask = async (req, res, next) => {
  try {
    const { title, description, project, assignedTo, priority, deadline, status } =
      req.body;

    if (!title || !assignedTo || !deadline) {
      return res.status(400).json({
        message: "title, assignedTo and deadline are required",
      });
    }

    const data = await Task.create({
      title,
      description,
      project,
      assignedTo,
      priority: priority || "medium",
      deadline,
      status: status || "todo",
      createdBy: req.user.userId,
    });

    const populated = await data.populate([
      { path: "assignedTo", select: "name email" },
      { path: "project", select: "name" },
    ]);

    const signupId = await findSignupIdForEmployee(assignedTo);
    await notify({
      user: signupId,
      type: "task-assigned",
      title: "New task assigned",
      message: `You have been assigned a new task: "${title}"`,
      relatedId: data._id,
      relatedModel: "Task",
    });

    await logAudit({
      user: req.user,
      action: "created",
      module: "Task",
      description: `Task "${title}" was created and assigned`,
      targetId: data._id,
    });

    res.status(201).json({
      message: "Task created successfully",
      data: populated,
    });
  } catch (error) {
    next(error);
  }
};

// ================= GET TASKS =================
// Supports: search, filter (status/priority/project/assignedTo), sort, pagination

const getTasks = async (req, res, next) => {
  try {
    const {
      search = "",
      status,
      priority,
      project,
      assignedTo,
      sortBy = "createdAt",
      sortOrder = "desc",
      page = 1,
      limit = 10,
    } = req.query;

    const query = {};

    if (search) query.title = { $regex: search, $options: "i" };
    if (status) query.status = status;
    if (priority) query.priority = priority;
    if (project) query.project = project;
    if (assignedTo) query.assignedTo = assignedTo;

    const allowedSortFields = ["title", "deadline", "createdAt", "priority", "status"];
    const sortField = allowedSortFields.includes(sortBy) ? sortBy : "createdAt";
    const sortDirection = sortOrder === "asc" ? 1 : -1;

    const pageNum = Math.max(parseInt(page) || 1, 1);
    const limitNum = Math.max(parseInt(limit) || 10, 1);
    const skip = (pageNum - 1) * limitNum;

    const [tasks, total] = await Promise.all([
      Task.find(query)
        .populate("assignedTo", "name email")
        .populate("project", "name")
        .sort({ [sortField]: sortDirection })
        .skip(skip)
        .limit(limitNum),
      Task.countDocuments(query),
    ]);

    res.status(200).json({
      message: "Tasks fetched successfully",
      data: tasks,
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

// ================= UPDATE TASK (status/details) =================
// Admin can update anything. Employee can update status/comments on their own tasks
// (route-level restriction handled via middleware + this check).

const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (req.user.role !== "admin") {
      // Employees may only change status on tasks assigned to them
      const employee = await Employee.findOne({ email: req.user.email });
      if (!employee || String(task.assignedTo) !== String(employee._id)) {
        return res.status(403).json({ message: "You can only update your own tasks" });
      }
      if (req.body.status) task.status = req.body.status;
    } else {
      Object.assign(task, req.body);
    }

    await task.save();

    const populated = await task.populate([
      { path: "assignedTo", select: "name email" },
      { path: "project", select: "name" },
    ]);

    await logAudit({
      user: req.user,
      action: "updated",
      module: "Task",
      description: `Task "${task.title}" was updated`,
      targetId: task._id,
    });

    res.status(200).json({
      message: "Task updated successfully",
      data: populated,
    });
  } catch (error) {
    next(error);
  }
};

// ================= ADD COMMENT ON TASK =================

const addComment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ message: "Comment text is required" });
    }

    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.comments.push({
      user: req.user.userId,
      userName: req.user.email,
      text,
    });

    await task.save();

    res.status(200).json({
      message: "Comment added successfully",
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

// ================= DELETE TASK (admin only) =================

const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await Task.findByIdAndDelete(id);

    if (!data) {
      return res.status(404).json({ message: "Task not found" });
    }

    await logAudit({
      user: req.user,
      action: "deleted",
      module: "Task",
      description: `Task "${data.title}" was deleted`,
      targetId: id,
    });

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  addComment,
  deleteTask,
};
