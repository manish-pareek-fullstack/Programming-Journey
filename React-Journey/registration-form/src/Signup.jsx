
import React, { useState } from "react";
import "./Signup.css";

const Signup = () => {
  const [form, setform] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    dob: "",
    course: "",
    gender: "",
    address: ""
  });

  const [error, seterror] = useState({});

  function handel(e) {
    e.preventDefault();
    let obj = {};

    if (form.name === "") obj.name = "name is req:";
    if (form.email === "") obj.email = "email is req:";
    if (form.password === "") obj.password = "pass is req:";
    if (form.mobile === "") obj.mobile = "mobile is req:";
    if (form.dob === "") obj.dob = "dob is req:";
    if (form.course === "") obj.course = "course is req:";
    if (form.gender === "") obj.gender = "gender is req:";
    if (form.address === "") obj.address = "address is req:";

    seterror(obj);

    if (Object.keys(obj).length === 0) {
      localStorage.setItem("signup", JSON.stringify(form));
      console.log(form);
      alert("Signup Successful ✅");
    }

    setform({
      name: "",
      email: "",
      password: "",
      mobile: "",
      dob: "",
      course: "",
      gender: "",
      address: ""
    });
  }

  return (
    <div className="login-page">
      <div className="login-card">

        <div className="login-header">
          <div className="login-icon">📝</div>
          <h2>Create Account</h2>
          <p>Signup to continue</p>
        </div>

        <form onSubmit={handel}>

          {/* NAME */}
          <div className="field">
            <label>Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={form.name}
              onChange={(e) => setform({ ...form, name: e.target.value })}
              className={error.name ? "input-err" : ""}
            />
            <p className="errmsg">{error.name}</p>
          </div>

          {/* EMAIL + PASSWORD */}
          <div className="row2">

            <div className="field">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter email"
                value={form.email}
                onChange={(e) => setform({ ...form, email: e.target.value })}
                className={error.email ? "input-err" : ""}
              />
              <p className="errmsg">{error.email}</p>
            </div>

            <div className="field">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter password"
                value={form.password}
                onChange={(e) => setform({ ...form, password: e.target.value })}
                className={error.password ? "input-err" : ""}
              />
              <p className="errmsg">{error.password}</p>
            </div>

          </div>

          {/* MOBILE + DOB */}
          <div className="row2">

            <div className="field">
              <label>Mobile</label>
              <input
                type="tel"
                placeholder="Enter mobile"
                value={form.mobile}
                onChange={(e) => setform({ ...form, mobile: e.target.value })}
                className={error.mobile ? "input-err" : ""}
              />
              <p className="errmsg">{error.mobile}</p>
            </div>

            <div className="field">
              <label>Date of Birth</label>
              <input
                type="date"
                value={form.dob}
                onChange={(e) => setform({ ...form, dob: e.target.value })}
                className={error.dob ? "input-err" : ""}
              />
              <p className="errmsg">{error.dob}</p>
            </div>

          </div>

          {/* COURSE */}
          <div className="field">
            <label>Course</label>
            <select
              value={form.course}
              onChange={(e) => setform({ ...form, course: e.target.value })}
              className={error.course ? "input-err" : ""}
            >
              <option value="">Select Course</option>
              <option value="BA">BA</option>
              <option value="BCA">BCA</option>
              <option value="BBA">BBA</option>
            </select>
            <p className="errmsg">{error.course}</p>
          </div>

          {/* GENDER */}
          <div className="field">
            <label>Gender</label>
            <div className="gender-group">

              <label className="gender-opt">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={form.gender === "Male"}
                  onChange={(e) =>
                    setform({ ...form, gender: e.target.value })
                  }
                />
                Male
              </label>

              <label className="gender-opt">
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={form.gender === "Female"}
                  onChange={(e) =>
                    setform({ ...form, gender: e.target.value })
                  }
                />
                Female
              </label>

              <label className="gender-opt">
                <input
                  type="radio"
                  name="gender"
                  value="Other"
                  checked={form.gender === "Other"}
                  onChange={(e) =>
                    setform({ ...form, gender: e.target.value })
                  }
                />
                Other
              </label>

            </div>
            <p className="errmsg">{error.gender}</p>
          </div>

          {/* ADDRESS */}
          <div className="field">
            <label>Address</label>
            <textarea
              placeholder="Enter your address"
              value={form.address}
              onChange={(e) => setform({ ...form, address: e.target.value })}
              className={error.address ? "input-err" : ""}
            />
            <p className="errmsg">{error.address}</p>
          </div>

          <button className="login-btn">
            Signup
          </button>

        </form>
      </div>
    </div>
  );
};

export default Signup;

