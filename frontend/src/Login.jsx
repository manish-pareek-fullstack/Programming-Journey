import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import {
  AuthLayout,
  AuthCard,
  TextField,
  PasswordField,
  SubmitButton,
  MailIcon,
} from "./auth/AuthUI";

const Login = () => {
  const [form, setform] = useState({ email: "", password: "" });
  const [errro, seterror] = useState({ email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const changehandel = (e) => {
    const { name, value } = e.target;
    setform({ ...form, [name]: value });
    if (value === "") {
      seterror({ ...errro, [name]: `${name} is req:` });
    } else {
      seterror({ ...errro, [name]: "" });
    }
  };

  async function handelsubmit(e) {
    e.preventDefault();

    // Validation
    if (form.email === "" || form.password === "") {
      seterror({
        email: form.email === "" ? "email is required" : "",
        password: form.password === "" ? "password is required" : "",
      });

      return;
    }

    try {
      setSubmitting(true);

      const response = await axios.post("http://localhost:5000/login", form, {
        withCredentials: true,
      });

      // Profile check
      await axios.get("http://localhost:5000/profile", {
        withCredentials: true,
      });

      toast.success("Successfully login");

      setform({
        email: "",
        password: "",
      });

      navigate("/LoginSuccess");
    } catch (error) {
      const status = error.response?.status;

      // Email database mein nahi hai
      if (status === 404) {
        toast.error("User not found. Please signup first");

        setTimeout(() => {
          navigate("/signup");
        }, 1000);

        return;
      }

      // Password galat hai
      if (status === 401) {
        toast.error("Invalid email or password");

        return;
      }

      // Other error
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AuthLayout tagline="One workspace for your people, projects and performance.">
      <AuthCard
        eyebrow="Welcome back"
        heading="Sign in"
        subheading="Enter your details to access your dashboard."
      >
        <form onSubmit={handelsubmit} noValidate>
          <TextField
            label="Email"
            icon={MailIcon}
            type="email"
            name="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={changehandel}
            error={errro.email}
            autoComplete="email"
          />

          <PasswordField
            label="Password"
            name="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={changehandel}
            error={errro.password}
            autoComplete="current-password"
          />

          <div className="mb-5 flex justify-end">
            <span
              className="cursor-pointer text-sm font-medium text-ems-primary hover:underline"
              onClick={() => navigate("/Email")}
            >
              Forgot password?
            </span>
          </div>

          <SubmitButton disabled={submitting}>
            {submitting ? "Signing in..." : "Log In"}
          </SubmitButton>
        </form>

        <p className="mt-6 text-center text-sm text-ems-muted">
          Don&apos;t have an account?{" "}
          <span
            className="cursor-pointer font-semibold text-ems-primary hover:underline"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </span>
        </p>
      </AuthCard>
    </AuthLayout>
  );
};

export default Login;
