const express = require("express");

const {
  createDepartment,
  getDepartments,
  updateDepartment,
  deleteDepartment,
} = require("../controller/departmentController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

// All Department routes are admin-only
router.post("/", authMiddleware, adminMiddleware, createDepartment);

router.get("/", authMiddleware, adminMiddleware, getDepartments);

router.patch("/:id", authMiddleware, adminMiddleware, updateDepartment);

router.delete("/:id", authMiddleware, adminMiddleware, deleteDepartment);

module.exports = router;
