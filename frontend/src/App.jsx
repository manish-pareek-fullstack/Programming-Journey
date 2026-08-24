import { BrowserRouter, Routes, Route } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { lazy, Suspense } from "react";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import "./dashboard.css";
import LoginSuccess from "./LoginSuccess";

// Lazy Imports (existing auth pages - untouched)
const Header = lazy(() => import("./Header"));
const Home = lazy(() => import("./Home"));
const Signup = lazy(() => import("./Signup"));
const Login = lazy(() => import("./Login"));
const Protect = lazy(() => import("./Protect"));
const Forget = lazy(() => import("./Forget"));
const Otp = lazy(() => import("./Otp"));
const Email = lazy(() => import("./Email"));
const Notifications = lazy(() => import("./Notifications"));

// Admin
const AdminLayout = lazy(() => import("./admin/AdminLayout"));
const AdminDashboardHome = lazy(() => import("./admin/AdminDashboardHome"));
const EmployeeManagement = lazy(() => import("./admin/EmployeeManagement"));
const DepartmentManagement = lazy(() =>
  import("./admin/DepartmentManagement"),
);
const ProjectManagement = lazy(() => import("./admin/ProjectManagement"));
const TaskManagement = lazy(() => import("./admin/TaskManagement"));
const AttendanceManagement = lazy(() =>
  import("./admin/AttendanceManagement"),
);
const LeaveManagement = lazy(() => import("./admin/LeaveManagement"));
const WorkReportManagement = lazy(() =>
  import("./admin/WorkReportManagement"),
);
const AuditLogs = lazy(() => import("./admin/AuditLogs"));

// Employee
const EmployeeLayout = lazy(() => import("./employee/EmployeeLayout"));
const EmployeeDashboardHome = lazy(() =>
  import("./employee/EmployeeDashboardHome"),
);
const MyProfile = lazy(() => import("./employee/MyProfile"));
const MyTasks = lazy(() => import("./employee/MyTasks"));
const MyAttendance = lazy(() => import("./employee/MyAttendance"));
const MyLeaves = lazy(() => import("./employee/MyLeaves"));
const MyWorkReports = lazy(() => import("./employee/MyWorkReports"));

function App() {
  return (
    <BrowserRouter>
      {" "}
      {/* Toast Container MUST be inside Router */}
      <ToastContainer
        position="top-right"
        autoClose={1500}
        pauseOnHover={false}
      />
      {/* Suspense with fallback (IMPORTANT) */}
      <Suspense fallback={<div>Loading...</div>}>
        <Header />

        <Routes>
          <Route path="/LoginSuccess" element={<LoginSuccess />} />
          <Route path="/Forget" element={<Forget />} />
          <Route path="/Email" element={<Email />} />
          <Route path="/Otp" element={<Otp />} />
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          {/* ================= ADMIN ================= */}
          <Route
            path="/admin"
            element={
              <Protect allowedRoles={["admin"]}>
                <AdminLayout />
              </Protect>
            }
          >
            <Route index element={<AdminDashboardHome />} />
            <Route path="employees" element={<EmployeeManagement />} />
            <Route path="departments" element={<DepartmentManagement />} />
            <Route path="projects" element={<ProjectManagement />} />
            <Route path="tasks" element={<TaskManagement />} />
            <Route path="attendance" element={<AttendanceManagement />} />
            <Route path="leaves" element={<LeaveManagement />} />
            <Route path="work-reports" element={<WorkReportManagement />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="audit-logs" element={<AuditLogs />} />
          </Route>

          {/* ================= EMPLOYEE ================= */}
          <Route
            path="/employee"
            element={
              <Protect allowedRoles={["employee", "admin"]}>
                <EmployeeLayout />
              </Protect>
            }
          >
            <Route index element={<EmployeeDashboardHome />} />
            <Route path="profile" element={<MyProfile />} />
            <Route path="tasks" element={<MyTasks />} />
            <Route path="attendance" element={<MyAttendance />} />
            <Route path="leaves" element={<MyLeaves />} />
            <Route path="work-reports" element={<MyWorkReports />} />
            <Route path="notifications" element={<Notifications />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
