const express = require("express");

const {
  createEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee,
  getMyProfile,
} = require("../controller/employeeController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

// Logged-in user's own employee profile (admin OR employee).
// NOTE: this must be declared BEFORE "/:id" or Express would treat
// "me" as an :id value.
router.get("/me", authMiddleware, getMyProfile);

// Admin-only Employee Management
router.post("/", authMiddleware, adminMiddleware, createEmployee);

router.get("/", authMiddleware, adminMiddleware, getEmployees);

router.patch("/:id", authMiddleware, adminMiddleware, updateEmployee);

router.delete("/:id", authMiddleware, adminMiddleware, deleteEmployee);

module.exports = router;
