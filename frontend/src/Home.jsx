import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Logo } from "./auth/AuthUI";

const FEATURES = [
  {
    title: "Employees & Departments",
    desc: "Onboard employees, organize departments, and keep every record searchable and up to date.",
    emoji: "🧑‍💼",
  },
  {
    title: "Projects & Tasks",
    desc: "Plan projects, assign tasks to the right people, and track progress from To-do to Completed.",
    emoji: "📋",
  },
  {
    title: "Attendance",
    desc: "One-click check-in / check-out with automatic working hours and monthly summaries.",
    emoji: "⏱️",
  },
  {
    title: "Leave Management",
    desc: "Employees apply for leave, managers approve or reject — with a full history for everyone.",
    emoji: "🗓️",
  },
  {
    title: "Daily Work Reports",
    desc: "Employees log what they worked on; managers review and leave feedback.",
    emoji: "📝",
  },
  {
    title: "Live Analytics",
    desc: "Real-time dashboards for headcount, task status, attendance and leave trends — no guesswork.",
    emoji: "📊",
  },
];

const Home = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const response = await axios.get("http://localhost:5000/profile", {
          withCredentials: true,
        });
        setUser(response.data.user);
        setIsLogin(true);
      } catch (error) {
        setIsLogin(false);
      }
    };
    checkLogin();
  }, []);

  const goToDashboard = () => navigate(user?.role === "admin" ? "/admin" : "/employee");

  return (
    <div className="bg-ems-bg">
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-gradient-to-br from-ems-primary-dark via-ems-primary to-ems-primary-soft">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="animate-ems-blob absolute -left-24 -top-24 h-80 w-80 rounded-full bg-white/20 blur-3xl" />
          <div className="animate-ems-blob-delay absolute -right-20 top-1/3 h-72 w-72 rounded-full bg-ems-accent/30 blur-3xl" />
          <div className="animate-ems-float-slow absolute bottom-0 left-1/4 h-64 w-64 rounded-full bg-ems-primary-dark/40 blur-3xl" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-5 pt-16 pb-24 grid lg:grid-cols-2 gap-10 items-center">
          <div className="animate-ems-fade-in-up">
            <span className="inline-block px-3 py-1 rounded-full bg-white/15 text-white text-xs font-semibold tracking-wide mb-5">
              Built for growing teams
            </span>
            <h1 className="font-display text-4xl sm:text-5xl italic leading-tight text-white mb-5">
              Run your whole company from one dashboard.
            </h1>
            <p className="text-white/85 text-base sm:text-lg leading-relaxed max-w-lg mb-8">
              Employees, projects, tasks, attendance, leaves and daily reports —
              the Employee Management System keeps every team in sync with
              real-time data, not spreadsheets.
            </p>

            <div className="flex flex-wrap gap-3">
              {isLogin ? (
                <button
                  onClick={goToDashboard}
                  className="px-6 py-3 rounded-xl bg-white text-ems-primary-dark text-sm font-bold shadow-lg hover:opacity-90 transition"
                >
                  Go to Dashboard
                </button>
              ) : (
                <>
                  <Link
                    to="/signup"
                    className="px-6 py-3 rounded-xl bg-white text-ems-primary-dark text-sm font-bold shadow-lg hover:opacity-90 transition"
                  >
                    Get Started Free
                  </Link>
                  <Link
                    to="/login"
                    className="px-6 py-3 rounded-xl border border-white/40 text-white text-sm font-bold hover:bg-white/10 transition"
                  >
                    I already have an account
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Product preview card */}
          <div className="relative hidden lg:block animate-ems-fade-in">
            <div className="rounded-2xl bg-white/95 backdrop-blur shadow-2xl shadow-black/20 p-5 border border-white/40">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-bold text-ems-ink">Company Dashboard</p>
                <span className="text-xs px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 font-semibold">
                  Live
                </span>
              </div>
              <div className="grid grid-cols-3 gap-3 mb-4">
                {[
                  ["Employees", "128"],
                  ["Projects", "24"],
                  ["Tasks Done", "312"],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-xl bg-ems-bg p-3">
                    <p className="text-lg font-bold text-ems-ink">{value}</p>
                    <p className="text-[11px] text-ems-muted">{label}</p>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                {["Attendance marked", "Leave approved", "New task assigned"].map((row) => (
                  <div
                    key={row}
                    className="flex items-center justify-between text-xs text-ems-muted bg-ems-bg rounded-lg px-3 py-2"
                  >
                    <span>{row}</span>
                    <span className="text-ems-primary font-semibold">●</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="absolute -bottom-5 -left-6 rounded-2xl bg-white shadow-xl px-4 py-3 border border-ems-border">
              <p className="text-xs text-ems-muted">Today's attendance</p>
              <p className="text-lg font-bold text-ems-ink">96% present</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="max-w-6xl mx-auto px-5 py-16">
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-ems-ink mb-3">
            Everything HR and managers need, in one place
          </h2>
          <p className="text-ems-muted text-sm sm:text-base">
            One login for admins and employees, with role-based access built in.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="bg-white rounded-2xl border border-ems-border shadow-sm p-6 hover:shadow-md hover:-translate-y-0.5 transition"
            >
              <div className="h-11 w-11 rounded-xl bg-ems-primary-soft/30 flex items-center justify-center text-xl mb-4">
                {f.emoji}
              </div>
              <h3 className="font-semibold text-ems-ink mb-1.5">{f.title}</h3>
              <p className="text-sm text-ems-muted leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= CTA ================= */}
      {!isLogin && (
        <section className="max-w-4xl mx-auto px-5 pb-20">
          <div className="rounded-3xl bg-gradient-to-br from-ems-primary to-ems-primary-dark px-8 py-12 text-center shadow-xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Ready to bring your team on board?
            </h2>
            <p className="text-white/85 text-sm sm:text-base mb-6 max-w-md mx-auto">
              Create your account and get access to your company's dashboard in minutes.
            </p>
            <Link
              to="/signup"
              className="inline-block px-7 py-3 rounded-xl bg-white text-ems-primary-dark text-sm font-bold shadow-lg hover:opacity-90 transition"
            >
              Create your account
            </Link>
          </div>
        </section>
      )}

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-ems-border bg-white">
        <div className="max-w-6xl mx-auto px-5 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Logo />
          <p className="text-xs text-ems-muted text-center sm:text-right">
            Employee Management System — Developed by <strong>Manish Pareek</strong>, Jaipur, Rajasthan
            <br />
            &copy; {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
