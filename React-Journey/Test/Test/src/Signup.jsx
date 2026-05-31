import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {
  const [form, setform] = useState({ email: "", password: "" });
  const [errro, seterror] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  console.log(form);

  const changehandel = (e) => {
    const { name, value } = e.target;
    setform({ ...form, [name]: value });
    if (value === "") {
      seterror({ ...errro, [name]: `${name} is req:` });
    } else {
      seterror({ ...errro, [name]: "" });
    }
  };

  function handelsubmit(e) {
    e.preventDefault();
    if (form.email === "" || form.password === "") {
      console.log("validation failed");
      seterror({
        email: form.email === "" ? "email is req" : "",
        password: form.password === "" ? "password is req" : "",
      });
      return;
    } else {
      toast.success("signup success fully");
      localStorage.setItem("signup", JSON.stringify(form));
      navigate("/login");
    }
    setform({ email: "", password: "" });
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-icon">✦</div>
        <h1 className="auth-heading">Create account</h1>
        <p className="auth-subheading">Sign up to get started today</p>

        <form onSubmit={handelsubmit}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              className="form-input"
              type="email"
              name="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={changehandel}
            />
            {errro.email && <span className="form-error">{errro.email}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              className="form-input"
              type="password"
              name="password"
              placeholder="Create a strong password"
              value={form.password}
              onChange={changehandel}
            />
            {errro.password && (
              <span className="form-error">{errro.password}</span>
            )}
          </div>

          <button type="submit" className="btn-primary">
            Create Account
          </button>
        </form>

        <div className="auth-link-row">
          Already have an account?{" "}
          <span
            className="auth-link"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/Login")}
          >
            Log in
          </span>
        </div>
      </div>
    </div>
  );
};

export default Signup;
