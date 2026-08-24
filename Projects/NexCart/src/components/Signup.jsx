import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { adduser } from "../slice/slicesignup";
import { toast } from "react-toastify";
const Signup = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
  });
  const [error, setError] = useState({});
  const navigate = useNavigate();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSignup = () => {
    let obj = {};
    if (!form.name) obj.name = "Name is required";
    if (!form.email) obj.email = "Email is required";
    if (!form.password) obj.password = "Password is required";
    if (!form.age) obj.age = "Age is required";
    if (form.age && Number(form.age) < 18) {
      obj.age = "You must be at least 18 years old to signup";
    }
    setError(obj);
    if (Object.keys(obj).length > 0) return;
    localStorage.setItem("user", JSON.stringify(form));
    dispatch(adduser(form));
    toast.success("Welcome! Your account has been created.");
    setTimeout(() => {
      navigate("/login");
    }, 700);
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>
          Create <span>Account</span>
        </h2>
        <p className="auth-subtitle">Join us today — it's free!</p>

        <div className="auth-field">
          <label>Name</label>
          <input name="name" placeholder="Your name" onChange={handleChange} />
          {error.name && <p className="auth-error">{error.name}</p>}
        </div>

        <div className="auth-field">
          <label>Email</label>
          <input
            name="email"
            placeholder="Email address"
            onChange={handleChange}
          />
          {error.email && <p className="auth-error">{error.email}</p>}
        </div>

        <div className="auth-field">
          <label>Password</label>
          <input
            name="password"
            placeholder="Password"
            type="password"
            onChange={handleChange}
          />
          {error.password && <p className="auth-error">{error.password}</p>}
        </div>

        <div className="auth-field">
          <label>Age</label>
          <input
            name="age"
            placeholder="Your age"
            type="number"
            onChange={handleChange}
          />
          {error.age && <p className="auth-error">{error.age}</p>}
        </div>

        <div className="auth-actions">
          <button className="btn-primary" onClick={handleSignup}>
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
