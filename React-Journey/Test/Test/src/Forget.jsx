import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Forget = () => {
  const [form, setForm] = useState({ password: "", confirmPassword: "" });
  const [error, setError] = useState({ password: "", confirmPassword: "" });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setError({ ...error, [name]: value === "" ? `${name} is required` : "" });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (form.password === "" && form.confirmPassword === "") {
      setError({
        password: form.password === "" ? "password is req:" : "",
        confirmPassword:
          form.confirmPassword === "" ? " confirm password is req" : "",
      });
      return;
    }
    console.log("password ", form.password);
    if (form.password !== form.confirmPassword) {
      toast.warning("please cheack your password not currect your password");
      return 0;
    } else if (form.password === form.confirmPassword) {
      let pass = JSON.parse(localStorage.getItem("signup"));
      console.log("signup", pass);
      pass.password = form.password;
      localStorage.setItem("signup", JSON.stringify(pass));
      toast.success("Password updated successfully");
    }
    console.log("Form Submitted", form);
    setForm({ password: "", confirmPassword: "" });
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
            />
            {error.confirmPassword && (
              <span className="form-error">{error.confirmPassword}</span>
            )}
          </div>

          <button type="submit" className="btn-primary">
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default Forget;
