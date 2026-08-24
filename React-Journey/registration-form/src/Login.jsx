
import React, { useState } from "react";
import "./Login.css";

const Login = () => {
  const [form, setform] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
  });

  const [error, seterror] = useState([]);

  function handel(e) {
    e.preventDefault();

    let result = JSON.parse(localStorage.getItem("signup"));
    let arr = [];

    if (form.name === "") arr.push({ name: "Name is required" });
    if (form.email === "") arr.push({ email: "Email is required" });
    if (form.password === "") arr.push({ password: "Password is required" });
    if (form.mobile === "") arr.push({ mobile: "Mobile is required" });

    seterror(arr);

    if (arr.length === 0) {
      if (!result) {
        seterror([{ login: "No user found, please signup first" }]);
        return;
      }

      if (result.name === form.name && result.password === form.password) {
        localStorage.setItem("user", JSON.stringify(form));

        setform({
          name: "",
          email: "",
          password: "",
          mobile: "",
        });

        seterror([]);
        alert("Login successful!");
      } else {
        seterror([{ login: "Incorrect name or password ❌" }]);
      }
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">

        <div className="login-header">
          <div className="login-icon">🔐</div>
          <h2>Welcome back</h2>
          <p>Login to your account</p>
        </div>

        <form onSubmit={handel}>

          {/* NAME */}
          <div className="field">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={form.name}
              onChange={(e) => setform({ ...form, name: e.target.value })}
              className={error.find((x) => x.name) ? "input-err" : ""}
            />
            <p className="errmsg">{error.find((x) => x.name)?.name}</p>
          </div>

          {/* EMAIL + PASSWORD */}
          <div className="row2">

            <div className="field">
              <label>Email</label>
              <input
                type="email"
                placeholder="you@email.com"
                value={form.email}
                onChange={(e) => setform({ ...form, email: e.target.value })}
                className={error.find((x) => x.email) ? "input-err" : ""}
              />
              <p className="errmsg">{error.find((x) => x.email)?.email}</p>
            </div>

            <div className="field">
              <label>Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setform({ ...form, password: e.target.value })}
                className={error.find((x) => x.password) ? "input-err" : ""}
              />
              <p className="errmsg">
                {error.find((x) => x.password)?.password}
              </p>
            </div>

          </div>

          {/* MOBILE */}
          <div className="field">
            <label>Mobile</label>
            <input
              type="tel"
              placeholder="Enter mobile number"
              value={form.mobile}
              onChange={(e) => setform({ ...form, mobile: e.target.value })}
              className={error.find((x) => x.mobile) ? "input-err" : ""}
            />
            <p className="errmsg">{error.find((x) => x.mobile)?.mobile}</p>
          </div>

          {/* LOGIN ERROR */}
          {error.find((x) => x.login) && (
            <div className="login-alert">
              {error.find((x) => x.login)?.login}
            </div>
          )}

          <button className="login-btn">
            Login
          </button>

        </form>
      </div>
    </div>
  );
};

export default Login;

