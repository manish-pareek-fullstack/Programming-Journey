const express = require("express");

const {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
} = require("../controller/projectController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

// Any logged-in user can view projects (filtered by employeeId for employees on the frontend)
router.get("/", authMiddleware, getProjects);
router.get("/:id", authMiddleware, getProjectById);

// Admin-only write operations
router.post("/", authMiddleware, adminMiddleware, createProject);
router.patch("/:id", authMiddleware, adminMiddleware, updateProject);
router.delete("/:id", authMiddleware, adminMiddleware, deleteProject);

module.exports = router;
