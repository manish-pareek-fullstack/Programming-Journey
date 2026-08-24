import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  AuthLayout,
  AuthCard,
  TextField,
  PasswordField,
  SubmitButton,
  MailIcon,
  UserIcon,
} from "./auth/AuthUI";

const Signup = () => {
  const [form, setform] = useState({ email: "", password: "", name: "" });
  const [errro, seterror] = useState({ email: "", password: "", name: "" });
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

    if (form.email === "" || form.password === "" || form.name === "") {
      console.log("validation failed");

      seterror({
        email: form.email === "" ? "email is req" : "",
        name: form.name === "" ? "name is req" : "",
        password: form.password === "" ? "password is req" : "",
      });

      return 0;
    }

    try {
      setSubmitting(true);

      const res = await axios.post("http://localhost:5000/signup", form);

      toast.success("Successfully signup");

      setform({
        name: "",
        email: "",
        password: "",
      });

      navigate("/Login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AuthLayout tagline="Join your team's workspace in just a few clicks.">
      <AuthCard
        eyebrow="Get started"
        heading="Create account"
        subheading="Sign up to get started today."
      >
        <form onSubmit={handelsubmit} noValidate>
          <TextField
            label="Name"
            icon={UserIcon}
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={changehandel}
            error={errro.name}
            autoComplete="name"
          />

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
            placeholder="Create a strong password"
            value={form.password}
            onChange={changehandel}
            error={errro.password}
            autoComplete="new-password"
          />

          <SubmitButton disabled={submitting}>
            {submitting ? "Creating account..." : "Create Account"}
          </SubmitButton>
        </form>

        <p className="mt-6 text-center text-sm text-ems-muted">
          Already have an account?{" "}
          <span
            className="cursor-pointer font-semibold text-ems-primary hover:underline"
            onClick={() => navigate("/Login")}
          >
            Log in
          </span>
        </p>
      </AuthCard>
    </AuthLayout>
  );
};

export default Signup;
