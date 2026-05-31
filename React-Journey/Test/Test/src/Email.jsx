import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Email = () => {
  const [form, setform] = useState({ email: "" });
  const [error, seterror] = useState({ email: "" });
  const signup = JSON.parse(localStorage.getItem("signup"));
  const emailsignup = signup?.email;
  console.log(emailsignup);
  const navigate = useNavigate();
  console.log(form);

  const handelchange = (e) => {
    const { name, value } = e.target;
    setform({ ...form, [name]: value });
    if (value === "") {
      seterror({ ...error, [name]: `${name} is req` });
    } else {
      seterror({ ...error, [name]: "" });
    }
  };

  function handesubmit(e) {
    e.preventDefault();
    if (form.email === "") {
      seterror({ email: form.email === "" ? "email is req" : "" });
      return 0;
    }
    if (emailsignup !== form.email) {
      toast.error("please currect email");
      return 0;
    } else {
      toast.success("your email is correct");
      setTimeout(() => {
        navigate("/Otp");
      }, 2500);
      return;
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <button className="btn-back" onClick={() => navigate(-1)}>
          Back
        </button>

        <div className="auth-icon">✉</div>
        <h1 className="auth-heading">Verify email</h1>
        <p className="auth-subheading">
          Enter your registered email address to continue
        </p>

        <form onSubmit={handesubmit}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              className="form-input"
              type="email"
              name="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handelchange}
            />
            {error.email && <span className="form-error">{error.email}</span>}
          </div>

          <button type="submit" className="btn-primary">
            Verify Email
          </button>
        </form>
      </div>
    </div>
  );
};

export default Email;
