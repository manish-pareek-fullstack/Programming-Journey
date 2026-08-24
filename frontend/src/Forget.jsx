import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import axios from "axios";

const Forget = () => {
  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState({
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const changeHandler = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError((prev) => ({
      ...prev,
      [name]: value === "" ? `${name} is required` : "",
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    let hasError = false;

    if (form.password === "") {
      hasError = true;

      setError((prev) => ({
        ...prev,
        password: "Password is required",
      }));
    }

    if (form.confirmPassword === "") {
      hasError = true;

      setError((prev) => ({
        ...prev,
        confirmPassword: "Confirm password is required",
      }));
    }

    if (hasError) {
      return;
    }

    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters");

      return;
    }

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");

      return;
    }

    try {
      setLoading(true);

      await axios.post(
        "http://localhost:5000/reset-password",

        {
          password: form.password,

          confirmPassword: form.confirmPassword,
        },

        {
          withCredentials: true,
        },
      );

      toast.success("Password updated successfully");

      setForm({
        password: "",
        confirmPassword: "",
      });

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to update password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-icon">🔑</div>

        <h1 className="auth-heading">New password</h1>

        <p className="auth-subheading">
          Choose a strong password for your account
        </p>

        <form onSubmit={submitHandler}>
          <div className="form-group">
            <label className="form-label">New Password</label>

            <input
              className="form-input"
              type="password"
              name="password"
              placeholder="Create new password"
              value={form.password}
              onChange={changeHandler}
              disabled={loading}
            />

            {error.password && (
              <span className="form-error">{error.password}</span>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Confirm Password</label>

            <input
              className="form-input"
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={form.confirmPassword}
              onChange={changeHandler}
              disabled={loading}
            />

            {error.confirmPassword && (
              <span className="form-error">{error.confirmPassword}</span>
            )}
          </div>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Forget;
