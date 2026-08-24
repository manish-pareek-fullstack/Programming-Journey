# Employee Management System

Developed by **Manish Pareek** — Jaipur, Rajasthan

A full-stack Employee Management System: authentication (JWT + HTTP-only
cookies), role-based access (admin / employee), employees & departments,
projects & tasks, attendance, leave management, daily work reports,
notifications, live analytics, and audit logs.

**Stack:** React + Tailwind CSS (frontend) · Node.js + Express + MongoDB (backend)

---

## 1. Requirements

- Node.js 18+
- MongoDB (local install, or a free MongoDB Atlas cluster)
- A Gmail account (for sending OTP / login-success emails)

---

## 2. Backend Setup

```bash
cd backend
npm install
```

Copy the example environment file and fill in your own values:

```bash
cp .env.example .env
```

`.env` variables:

| Variable     | Description                                                            |
| ------------ | ------------------------------------------------------------------------ |
| `MONGO_URI`  | MongoDB connection string, e.g. `mongodb://127.0.0.1:27017/ems`         |
| `JWT_SECRET` | Any long random string, used to sign JWT tokens                        |
| `PORT`       | Port the backend runs on (default `5000`)                               |
| `EMAIL_USER` | Gmail address used to send OTP / login-success emails                   |
| `EMAIL_PASS` | Gmail **App Password** (Google Account → Security → App Passwords)     |

Start MongoDB (if running locally):

```bash
mongod
```

Run the backend:

```bash
npm run dev
```

The API will be available at `http://localhost:5000`.

---

## 3. Frontend Setup

In a new terminal:

```bash
cd frontend
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## 4. Creating your first Admin account

Normal signup **always** creates an `employee` account — this is intentional
for security. To get your first admin:

1. Sign up normally through the app (`/signup`).
2. From the `backend` folder, run:

   ```bash
   node seedAdmin.js youremail@example.com
   ```

3. Log out and log back in — your account is now an `admin`.

---

## 5. Demo roles / accounts

There are no pre-seeded demo accounts (no fake data is used anywhere in this
project — all numbers and records come from real MongoDB data). Create your
own accounts as described above:

- **Admin** — full access to Employees, Departments, Projects, Tasks,
  Attendance, Leaves, Work Reports, Notifications, Analytics and Audit Logs.
- **Employee** — access to their own Dashboard, Profile, Tasks, Attendance,
  Leaves, Work Reports and Notifications.

---

## 6. Testing the API with Postman

Base URL: `http://localhost:5000`

1. In Postman, enable **"Send cookies automatically"** (or use a Postman
   cookie jar) — this project uses HTTP-only cookies for authentication, not
   Bearer tokens.
2. Call `POST /signup` then `POST /login` first — Postman will store the
   `token` cookie automatically and reuse it on subsequent requests.
3. Key endpoints:

   | Method | Endpoint                       | Notes                        |
   | ------ | ------------------------------- | ----------------------------- |
   | POST   | `/signup`                       | Create an account (employee) |
   | POST   | `/login`                        | Log in, sets cookie          |
   | GET    | `/profile`                      | Current logged-in user       |
   | GET    | `/employees` `/departments`     | Admin only                   |
   | GET    | `/projects` `/tasks`            | Projects & tasks              |
   | POST   | `/attendance/check-in` `/check-out` | Employee attendance      |
   | POST   | `/leaves`                       | Apply for leave                |
   | PATCH  | `/leaves/:id/review`            | Admin approve/reject          |
   | POST   | `/work-reports`                 | Submit daily report            |
   | GET    | `/notifications`                | Current user's notifications  |
   | GET    | `/analytics/dashboard`          | Admin analytics (real data)   |
   | GET    | `/analytics/recent-activity`    | Admin recent activity         |
   | GET    | `/audit-logs`                   | Admin audit trail              |

---

## 7. Project Structure

```
backend/
  controller/   business logic
  route/        Express routers
  model/        Mongoose schemas
  middleware/   auth + admin guards, error handler
  utils/        email sender, branded email template, audit logger, notifier

frontend/
  src/
    admin/      Admin dashboard pages (Tailwind)
    employee/   Employee dashboard pages (Tailwind)
    auth/       Shared Login/Signup UI building blocks
    lib/        Shared axios instance + UI helpers (badges, buttons, cards)
```
