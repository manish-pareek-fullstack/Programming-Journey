const Department = require("../model/Department");
const Employee = require("../model/Employee");
const logAudit = require("../utils/auditLogger");

// ================= CREATE DEPARTMENT (admin only) =================

const createDepartment = async (req, res, next) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Department name is required",
      });
    }

    const existing = await Department.findOne({ name: name.trim() });

    if (existing) {
      return res.status(400).json({
        message: "Department already exists",
      });
    }

    const data = await Department.create({
      name: name.trim(),
      description,
    });

    await logAudit({
      user: req.user,
      action: "created",
      module: "Department",
      description: `Department "${data.name}" was created`,
      targetId: data._id,
    });

    res.status(201).json({
      message: "Department created successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};

// ================= GET DEPARTMENTS (admin only) =================

const getDepartments = async (req, res, next) => {
  try {
    const data = await Department.find().sort({ name: 1 });

    res.status(200).json({
      message: "Departments fetched successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};

// ================= UPDATE DEPARTMENT (admin only) =================

const updateDepartment = async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await Department.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true },
    );

    if (!data) {
      return res.status(404).json({
        message: "Department not found",
      });
    }

    await logAudit({
      user: req.user,
      action: "updated",
      module: "Department",
      description: `Department "${data.name}" was updated`,
      targetId: data._id,
    });

    res.status(200).json({
      message: "Department updated successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};

// ================= DELETE DEPARTMENT (admin only) =================

const deleteDepartment = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Prevent deleting a department that employees still belong to
    const inUse = await Employee.findOne({ department: id });

    if (inUse) {
      return res.status(400).json({
        message: "Cannot delete: employees are still assigned to this department",
      });
    }

    const data = await Department.findByIdAndDelete(id);

    if (!data) {
      return res.status(404).json({
        message: "Department not found",
      });
    }

    await logAudit({
      user: req.user,
      action: "deleted",
      module: "Department",
      description: `Department "${data.name}" was deleted`,
      targetId: data._id,
    });

    res.status(200).json({
      message: "Department deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createDepartment,
  getDepartments,
  updateDepartment,
  deleteDepartment,
};
