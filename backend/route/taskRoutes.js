const express = require("express");

const {
  createTask,
  getTasks,
  updateTask,
  addComment,
  deleteTask,
} = require("../controller/taskController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

router.get("/", authMiddleware, getTasks);

router.post("/", authMiddleware, adminMiddleware, createTask);

// Employees can update status on their own task; admins can update anything
// (fine-grained ownership check happens inside the controller)
router.patch("/:id", authMiddleware, updateTask);

router.post("/:id/comments", authMiddleware, addComment);

router.delete("/:id", authMiddleware, adminMiddleware, deleteTask);

module.exports = router;
