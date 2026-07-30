import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
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
    const signup = JSON.parse(localStorage.getItem("signup"));
    if (!signup) {
    toast.error("Account not found. Please sign up first.");
      const time = setTimeout(() => {
        navigate("/signup");
      }, 2500);
      return;
    }
    if (form.email === "" && form.password === "") {
      seterror({
        email: form.email === "" ? "email is req" : "",
        password: form.password === "" ? "pass is req" : "",
      });
      return;
    }
    console.log("huu");
    console.log("singup", signup);
    if (form.email !== signup.email && form.password !== signup.password) {
      toast.error("Invalid email or password", {
        autoClose: 1500,
        pauseOnHover: false,
      });
    } else if (form.email !== signup.email) {
      toast.error("Invalid email", { autoClose: 1500, pauseOnHover: true });
    } else if (form.password !== signup.password) {
      toast.error("password is invalid ", {
        autoClose: 1500,
        pauseOnHover: false,
      });
    } else {
      toast.success("login successfully ", {
        autoClose: 1500,
        pauseOnHover: false,
      });
      navigate("/LoginSuccess");
      localStorage.setItem("login", JSON.stringify(form));
      localStorage.setItem("islogin", JSON.stringify(true));
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-icon">⬡</div>
        <h1 className="auth-heading">Welcome back</h1>
        <p className="auth-subheading">Sign in to your account</p>

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
              placeholder="Enter your password"
              value={form.password}
              onChange={changehandel}
            />
            {errro.password && (
              <span className="form-error">{errro.password}</span>
            )}
          </div>

          <button type="submit" className="btn-primary">
            Log In
          </button>
        </form>

        <div className="auth-link-row" style={{ marginTop: "1rem" }}>
          <span
            className="auth-link"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/Email")}
          >
            Forgot password?
          </span>
        </div>

        <div className="auth-link-row">
          Don't have an account?{" "}
          <span
            className="auth-link"
            style={{ cursor: "pointer" }}
            onClick={() => navigate(-1)}
          >
            Go back
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
