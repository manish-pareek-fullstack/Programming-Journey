import React, { useState } from "react";

/* ============================================================
   AuthUI — shared, presentation-only building blocks for the
   Login and Signup pages.

   Nothing in this file touches the network, auth state, or
   routing. Every field simply forwards the props it's given
   (name, value, onChange, ...) so Login.jsx / Signup.jsx keep
   their exact existing validation + submit logic untouched.
   ============================================================ */

/* ── Icons (inline SVG, no icon library needed) ─────────────── */

export const MailIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.7" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 6.75A2.25 2.25 0 0 1 5.25 4.5h13.5A2.25 2.25 0 0 1 21 6.75v10.5A2.25 2.25 0 0 1 18.75 19.5H5.25A2.25 2.25 0 0 1 3 17.25V6.75Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="m3.5 7 7.72 5.68a1.5 1.5 0 0 0 1.77 0L20.5 7" />
  </svg>
);

export const LockIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.7" stroke="currentColor" {...props}>
    <rect x="4.5" y="10.5" width="15" height="9.75" rx="2.25" strokeLinecap="round" strokeLinejoin="round" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.75 10.5V7.5a4.25 4.25 0 1 1 8.5 0v3" />
  </svg>
);

export const UserIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.7" stroke="currentColor" {...props}>
    <circle cx="12" cy="8" r="3.25" strokeLinecap="round" strokeLinejoin="round" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.75 19.25c.9-3.4 3.9-5.25 7.25-5.25s6.35 1.85 7.25 5.25" />
  </svg>
);

export const EyeIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.7" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12S5.25 5.75 12 5.75 21.75 12 21.75 12 18.75 18.25 12 18.25 2.25 12 2.25 12Z" />
    <circle cx="12" cy="12" r="2.75" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const EyeOffIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.7" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.5 3.5l17 17M10.6 10.7a2.75 2.75 0 0 0 3.85 3.83M7.4 7.5C5 9 3.4 12 3.4 12s3 6.25 9.75 6.25c1.62 0 3-.35 4.15-.9M16.8 16.85c2.55-1.55 4-4.85 4-4.85s-.98-2.05-2.9-3.7M12 5.75c.6 0 1.18.05 1.72.15" />
  </svg>
);

const BriefcaseIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.7" stroke="currentColor" {...props}>
    <rect x="3" y="7.25" width="18" height="12" rx="2.25" strokeLinecap="round" strokeLinejoin="round" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.25V6A2.25 2.25 0 0 1 10.5 3.75h3A2.25 2.25 0 0 1 15.75 6v1.25M3 12.75h18" />
  </svg>
);

const LayersIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.7" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m12 3.5 8.25 4.5L12 12.5 3.75 8 12 3.5Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 12 8.25 4.5L20.25 12M3.75 16l8.25 4.5L20.25 16" />
  </svg>
);

const CheckBadgeIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.7" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.25l2.1 2.1L15.5 10" />
    <circle cx="12" cy="12" r="8.25" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ── Brand mark ───────────────────────────────────────────── */

export const Logo = ({ size = "md", light = false }) => {
  const dims = size === "lg" ? "h-11 w-11 rounded-2xl text-lg" : "h-9 w-9 rounded-xl text-sm";
  return (
    <div className="flex items-center gap-2.5">
      <div
        className={`${dims} flex items-center justify-center font-bold text-white shadow-lg shadow-ems-primary/30 bg-gradient-to-br from-ems-primary to-ems-primary-dark shrink-0`}
      >
        EM
      </div>
      <span
        className={`font-body font-semibold tracking-tight ${
          size === "lg" ? "text-lg" : "text-base"
        } ${light ? "text-white" : "text-ems-ink"}`}
      >
        Employee Management System
      </span>
    </div>
  );
};

/* ── Floating glass stat card, used on the left visual panel ── */

const FloatCard = ({ icon: Icon, title, subtitle, className = "", anim = "animate-ems-float" }) => (
  <div
    className={`absolute ${anim} rounded-2xl border border-white/25 bg-white/10 backdrop-blur-md px-4 py-3 shadow-xl shadow-black/10 ${className}`}
  >
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20 text-white">
        <Icon className="h-4.5 w-4.5" />
      </div>
      <div className="leading-tight">
        <p className="text-sm font-semibold text-white">{title}</p>
        <p className="text-xs text-white/70">{subtitle}</p>
      </div>
    </div>
  </div>
);

/* ── Left visual panel shared by Login + Signup ──────────────── */

const VisualPanel = ({ tagline }) => (
  <div className="relative hidden lg:flex lg:w-[46%] flex-col justify-between overflow-hidden bg-gradient-to-br from-ems-primary-dark via-ems-primary to-ems-primary-soft px-12 py-12">
    {/* ambient gradient blobs */}
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="animate-ems-blob absolute -left-24 -top-24 h-80 w-80 rounded-full bg-white/20 blur-3xl" />
      <div className="animate-ems-blob-delay absolute -right-20 top-1/3 h-72 w-72 rounded-full bg-ems-accent/30 blur-3xl" />
      <div className="animate-ems-float-slow absolute bottom-0 left-1/4 h-64 w-64 rounded-full bg-ems-primary-dark/40 blur-3xl" />
    </div>

    <div className="relative z-10 animate-ems-fade-in">
      <Logo size="lg" light />
      <p className="mt-8 max-w-sm font-display text-3xl italic leading-snug text-white/95">
        {tagline}
      </p>
    </div>

    {/* floating, product-themed cards — purely decorative */}
    <div className="relative z-10 hidden xl:block h-64">
      <FloatCard
        icon={BriefcaseIcon}
        title="Projects"
        subtitle="On track this sprint"
        className="left-2 top-2 animate-ems-float"
      />
      <FloatCard
        icon={LayersIcon}
        title="Tasks"
        subtitle="Assigned across teams"
        className="right-0 top-20 animate-ems-float-alt"
      />
      <FloatCard
        icon={CheckBadgeIcon}
        title="Attendance"
        subtitle="Marked for today"
        className="left-10 top-40 animate-ems-float-slow"
      />
    </div>

    <div className="relative z-10 animate-ems-fade-in text-xs text-white/70">
      Employee Management System — Developed by Manish Pareek, Jaipur, Rajasthan
    </div>
  </div>
);

/* ── Page shell: visual panel + centered card on the right ──── */

export const AuthLayout = ({ tagline, children }) => (
  <div className="min-h-screen w-full flex bg-ems-bg font-body">
    <VisualPanel tagline={tagline} />
    <div className="flex w-full lg:w-[54%] items-center justify-center px-5 py-10 sm:px-10">
      <div className="w-full max-w-md animate-ems-fade-in-up">{children}</div>
    </div>
  </div>
);

/* ── Card wrapper for the form itself ────────────────────────── */

export const AuthCard = ({ eyebrow, heading, subheading, children }) => (
  <div className="rounded-3xl border border-ems-border bg-ems-surface p-8 shadow-xl shadow-ems-primary/5 sm:p-10">
    <div className="mb-2 lg:hidden">
      <Logo />
    </div>
    {eyebrow && (
      <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-ems-primary">
        {eyebrow}
      </p>
    )}
    <h1 className="mt-2 font-display text-3xl text-ems-ink">{heading}</h1>
    <p className="mt-1.5 text-sm text-ems-muted">{subheading}</p>
    <div className="mt-7">{children}</div>
  </div>
);

/* ── Form fields ──────────────────────────────────────────────
   These only style the input; every prop (name, value, onChange,
   placeholder, ...) is forwarded untouched to a real <input />. */

export const TextField = ({ label, icon: Icon, error, ...inputProps }) => (
  <div className="mb-4">
    <label className="mb-1.5 block text-sm font-medium text-ems-ink">{label}</label>
    <div
      className={`flex items-center gap-2.5 rounded-xl border bg-white px-3.5 py-2.5 transition focus-within:ring-2 focus-within:ring-ems-primary/30 ${
        error ? "border-red-400" : "border-ems-border focus-within:border-ems-primary"
      }`}
    >
      {Icon && <Icon className="h-4.5 w-4.5 shrink-0 text-ems-muted" />}
      <input
        className="w-full bg-transparent text-sm text-ems-ink placeholder:text-ems-muted/70 focus:outline-none"
        {...inputProps}
      />
    </div>
    {error && <p className="mt-1.5 text-xs font-medium text-red-500">{error}</p>}
  </div>
);

export const PasswordField = ({ label, error, ...inputProps }) => {
  const [show, setShow] = useState(false);
  return (
    <div className="mb-4">
      <label className="mb-1.5 block text-sm font-medium text-ems-ink">{label}</label>
      <div
        className={`flex items-center gap-2.5 rounded-xl border bg-white px-3.5 py-2.5 transition focus-within:ring-2 focus-within:ring-ems-primary/30 ${
          error ? "border-red-400" : "border-ems-border focus-within:border-ems-primary"
        }`}
      >
        <LockIcon className="h-4.5 w-4.5 shrink-0 text-ems-muted" />
        <input
          type={show ? "text" : "password"}
          className="w-full bg-transparent text-sm text-ems-ink placeholder:text-ems-muted/70 focus:outline-none"
          {...inputProps}
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          className="shrink-0 text-ems-muted transition hover:text-ems-primary"
          aria-label={show ? "Hide password" : "Show password"}
          tabIndex={-1}
        >
          {show ? <EyeOffIcon className="h-4.5 w-4.5" /> : <EyeIcon className="h-4.5 w-4.5" />}
        </button>
      </div>
      {error && <p className="mt-1.5 text-xs font-medium text-red-500">{error}</p>}
    </div>
  );
};

export const SubmitButton = ({ children, ...buttonProps }) => (
  <button
    type="submit"
    className="mt-2 w-full rounded-xl bg-gradient-to-r from-ems-primary to-ems-primary-dark py-2.75 text-sm font-semibold text-white shadow-lg shadow-ems-primary/25 transition hover:shadow-ems-primary/40 hover:brightness-105 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
    {...buttonProps}
  >
    {children}
  </button>
);
