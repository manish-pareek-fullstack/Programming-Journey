const Project = require("../model/Project");
const Task = require("../model/Task");
const logAudit = require("../utils/auditLogger");

// ================= CREATE PROJECT (admin only) =================

const createProject = async (req, res, next) => {
  try {
    const {
      name,
      description,
      manager,
      teamMembers,
      status,
      priority,
      startDate,
      endDate,
    } = req.body;

    if (!name || !manager || !startDate) {
      return res.status(400).json({
        message: "name, manager and startDate are required",
      });
    }

    const data = await Project.create({
      name,
      description,
      manager,
      teamMembers: teamMembers || [],
      status: status || "planning",
      priority: priority || "medium",
      startDate,
      endDate,
      createdBy: req.user.userId,
    });

    const populated = await data.populate([
      { path: "manager", select: "name email" },
      { path: "teamMembers", select: "name email" },
    ]);

    await logAudit({
      user: req.user,
      action: "created",
      module: "Project",
      description: `Project "${data.name}" was created`,
      targetId: data._id,
    });

    res.status(201).json({
      message: "Project created successfully",
      data: populated,
    });
  } catch (error) {
    next(error);
  }
};

// ================= GET PROJECTS =================
// Admin: all projects. Employee: only projects they manage or are a member of.
// Supports: search, filter (status/priority), sort, pagination

const getProjects = async (req, res, next) => {
  try {
    const {
      search = "",
      status,
      priority,
      sortBy = "createdAt",
      sortOrder = "desc",
      page = 1,
      limit = 10,
      employeeId,
    } = req.query;

    const query = {};

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    if (status) query.status = status;
    if (priority) query.priority = priority;

    if (employeeId) {
      query.$or = [{ manager: employeeId }, { teamMembers: employeeId }];
    }

    const allowedSortFields = ["name", "startDate", "endDate", "createdAt", "priority", "status"];
    const sortField = allowedSortFields.includes(sortBy) ? sortBy : "createdAt";
    const sortDirection = sortOrder === "asc" ? 1 : -1;

    const pageNum = Math.max(parseInt(page) || 1, 1);
    const limitNum = Math.max(parseInt(limit) || 10, 1);
    const skip = (pageNum - 1) * limitNum;

    const [projects, total] = await Promise.all([
      Project.find(query)
        .populate("manager", "name email")
        .populate("teamMembers", "name email")
        .sort({ [sortField]: sortDirection })
        .skip(skip)
        .limit(limitNum),
      Project.countDocuments(query),
    ]);

    res.status(200).json({
      message: "Projects fetched successfully",
      data: projects,
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

// ================= GET SINGLE PROJECT (with its tasks) =================

const getProjectById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const project = await Project.findById(id)
      .populate("manager", "name email")
      .populate("teamMembers", "name email");

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const tasks = await Task.find({ project: id }).populate("assignedTo", "name email");

    res.status(200).json({
      message: "Project fetched successfully",
      data: { ...project.toObject(), tasks },
    });
  } catch (error) {
    next(error);
  }
};

// ================= UPDATE PROJECT (admin only) =================

const updateProject = async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await Project.findByIdAndUpdate(id, { $set: req.body }, { new: true })
      .populate("manager", "name email")
      .populate("teamMembers", "name email");

    if (!data) {
      return res.status(404).json({ message: "Project not found" });
    }

    await logAudit({
      user: req.user,
      action: "updated",
      module: "Project",
      description: `Project "${data.name}" was updated`,
      targetId: data._id,
    });

    res.status(200).json({
      message: "Project updated successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};

// ================= DELETE PROJECT (admin only) =================

const deleteProject = async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await Project.findByIdAndDelete(id);

    if (!data) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Also remove tasks tied to this project
    await Task.deleteMany({ project: id });

    await logAudit({
      user: req.user,
      action: "deleted",
      module: "Project",
      description: `Project "${data.name}" was deleted`,
      targetId: id,
    });

    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
