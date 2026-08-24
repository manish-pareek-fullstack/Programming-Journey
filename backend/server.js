require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const connectDB = require("./config/db");

const employeeRoutes = require("./route/employeeRoutes");
const departmentRoutes = require("./route/departmentRoutes");
const userRoutes = require("./route/userRoutes");
const projectRoutes = require("./route/projectRoutes");
const taskRoutes = require("./route/taskRoutes");
const attendanceRoutes = require("./route/attendanceRoutes");
const leaveRoutes = require("./route/leaveRoutes");
const workReportRoutes = require("./route/workReportRoutes");
const notificationRoutes = require("./route/notificationRoutes");
const analyticsRoutes = require("./route/analyticsRoutes");
const auditLogRoutes = require("./route/auditLogRoutes");
const errorMiddleware = require("./middleware/errorMiddleware");

const app = express();

const PORT = process.env.PORT || 5000;

connectDB();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(cookieParser());

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Server is running",
  });
});

app.use("/employees", employeeRoutes);

app.use("/departments", departmentRoutes);

app.use("/projects", projectRoutes);

app.use("/tasks", taskRoutes);

app.use("/attendance", attendanceRoutes);

app.use("/leaves", leaveRoutes);

app.use("/work-reports", workReportRoutes);

app.use("/notifications", notificationRoutes);

app.use("/analytics", analyticsRoutes);

app.use("/audit-logs", auditLogRoutes);

app.use("/", userRoutes);

app.use(errorMiddleware);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
