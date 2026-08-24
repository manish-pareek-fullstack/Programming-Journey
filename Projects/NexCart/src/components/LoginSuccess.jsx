import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./loginSuccess.css";

const LoginSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/"); 
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

 return (
   <div className="success-container">
     <div className="success-card">
       <div className="checkmark">✔</div>
       <h1>Login Successful</h1>
       <p>Welcome back 👋 Loading your dashboard...</p>
       <div className="success-progress">
         <div className="success-progress-bar"></div>
       </div>
     </div>
   </div>
 );
};

export default LoginSuccess;
