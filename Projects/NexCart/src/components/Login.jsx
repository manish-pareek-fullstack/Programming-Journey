import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
const Login = () => {
  const data = useSelector((state) => state.signup.user);
  console.log('reduce data', data);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  const navigate = useNavigate();
  const handleLogin = () => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    let obj = {};
    if (email === "") {
      obj.email = "Email is required";
    }
    if (password === "") {
      obj.password = "Password is required";
    }
    if (!savedUser) {
      obj.general = "No account found. Please sign up first.";
      setError(obj);
      return;
    }
    setError(obj);
    if (Object.keys(obj).length > 0) return;

    if (email === savedUser.email && password === savedUser.password) {
      localStorage.setItem("login", true);
   toast.success("Login successful!");
   setTimeout(() => {
     navigate("/");
   }, 1500);
      return;
    }
    if (email !== savedUser.email) {
      obj.email = "Email is incorrect. Please check again.";
    }
    if (password !== savedUser.password) {
      obj.password = "Password is incorrect. Please try again.";
    }

    setError(obj);
  };

 return (
   <div className="auth-page">
     <div className="auth-card">
       <h2>
         Welcome <span>Back</span>
       </h2>
       <p className="auth-subtitle">Sign in to your account to continue</p>

       <div className="auth-field">
         <label>Email</label>
         <input
           type="email"
           placeholder="Enter email"
           onChange={(e) => setEmail(e.target.value)}
         />
         {error.email && <p className="auth-error">{error.email}</p>}
       </div>

       <div className="auth-field">
         <label>Password</label>
         <input
           type="password"
           placeholder="Enter password"
           onChange={(e) => setPassword(e.target.value)}
         />
         {error.password && <p className="auth-error">{error.password}</p>}
       </div>

       {error.general && <p className="auth-error">{error.general}</p>}

       <div className="auth-actions">
         <button className="btn-primary" onClick={handleLogin}>
           Login
         </button>
         <button className="btn-ghost" onClick={() => navigate("/signup")}>
           Go to Signup
         </button>
       </div>
     </div>
   </div>
 );
};

export default Login;
