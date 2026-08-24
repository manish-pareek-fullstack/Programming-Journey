const Employee = require("../model/Employee");
const logAudit = require("../utils/auditLogger");

// ================= CREATE EMPLOYEE (admin only) =================

const createEmployee = async (req, res, next) => {
  try {
    const { name, email, phone, department, designation, joiningDate, status } =
      req.body;

    if (!name || !email || !phone || !department || !designation || !joiningDate) {
      return res.status(400).json({
        message:
          "name, email, phone, department, designation and joiningDate are required",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const existing = await Employee.findOne({ email: normalizedEmail });

    if (existing) {
      return res.status(400).json({
        message: "Employee with this email already exists",
      });
    }

    const data = await Employee.create({
      name,
      email: normalizedEmail,
      phone,
      department,
      designation,
      joiningDate,
      status: status || "active",
    });

    const populated = await data.populate("department", "name");

    await logAudit({
      user: req.user,
      action: "created",
      module: "Employee",
      description: `Employee "${data.name}" was created`,
      targetId: data._id,
    });

    res.status(201).json({
      message: "Employee created successfully",
      data: populated,
    });
  } catch (error) {
    next(error);
  }
};

// ================= GET EMPLOYEES (admin only) =================
// Supports: search, filter (department/status), sort, pagination
// Example: /employees?search=raj&department=<id>&status=active&sortBy=name&sortOrder=asc&page=1&limit=10

const getEmployees = async (req, res, next) => {
  try {
    const {
      search = "",
      department,
      status,
      sortBy = "createdAt",
      sortOrder = "desc",
      page = 1,
      limit = 10,
    } = req.query;

    const query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    if (department) {
      query.department = department;
    }

    if (status) {
      query.status = status;
    }

    const allowedSortFields = ["name", "email", "joiningDate", "createdAt", "status"];
    const sortField = allowedSortFields.includes(sortBy) ? sortBy : "createdAt";
    const sortDirection = sortOrder === "asc" ? 1 : -1;

    const pageNum = Math.max(parseInt(page) || 1, 1);
    const limitNum = Math.max(parseInt(limit) || 10, 1);
    const skip = (pageNum - 1) * limitNum;

    const [employees, total] = await Promise.all([
      Employee.find(query)
        .populate("department", "name")
        .sort({ [sortField]: sortDirection })
        .skip(skip)
        .limit(limitNum),
      Employee.countDocuments(query),
    ]);

    res.status(200).json({
      message: "Employees fetched successfully",
      data: employees,
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

// ================= UPDATE EMPLOYEE (admin only) =================

const updateEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await Employee.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true },
    ).populate("department", "name");

    if (!data) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    await logAudit({
      user: req.user,
      action: "updated",
      module: "Employee",
      description: `Employee "${data.name}" was updated`,
      targetId: data._id,
    });

    res.status(200).json({
      message: "Employee updated successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};

// ================= DELETE EMPLOYEE (admin only) =================

const deleteEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await Employee.findByIdAndDelete(id);

    if (!data) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    await logAudit({
      user: req.user,
      action: "deleted",
      module: "Employee",
      description: `Employee "${data.name}" was deleted`,
      targetId: data._id,
    });

    res.status(200).json({
      message: "Employee deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// ================= MY PROFILE (logged-in employee/admin) =================
// Matches the Employee record to the logged-in Signup account by email.

const getMyProfile = async (req, res, next) => {
  try {
    const employee = await Employee.findOne({ email: req.user.email }).populate(
      "department",
      "name",
    );

    if (!employee) {
      return res.status(404).json({
        message:
          "No employee record found linked to your account. Please contact admin.",
      });
    }

    res.status(200).json({
      message: "Profile fetched successfully",
      data: employee,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee,
  getMyProfile,
};
