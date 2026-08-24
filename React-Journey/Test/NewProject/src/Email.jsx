import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Email = () => {
  const [form, setform] = useState({ email: "" });
  const [error, seterror] = useState({ email: "" });

  const navigate = useNavigate();

  const signup = JSON.parse(localStorage.getItem("signup"));
  const emailsignup = signup?.email;

  const handelchange = (e) => {
    const { name, value } = e.target;

    setform((prev) => ({
      ...prev,
      [name]: value,
    }));

    seterror((prev) => ({
      ...prev,
      [name]: value === "" ? `${name} is required` : "",
    }));
  };

  function handesubmit(e) {
    e.preventDefault();

    // empty check
    if (form.email === "") {
      seterror({ email: "email is required" });
      toast.error("Email is required", {
        autoClose: 1500,
        pauseOnHover: false,
      });
      return;
    }

    // signup check
    if (!emailsignup) {
      toast.error("No account found. Please signup first", {
        autoClose: 1500,
        pauseOnHover: false,
      });
      return;
    }

    // match check
    if (emailsignup !== form.email) {
      toast.error("Incorrect email", {
        autoClose: 1500,
        pauseOnHover: false,
      });
      return;
    }

    // success
    toast.success("Email verified successfully", {
      autoClose: 1500,
      pauseOnHover: false,
    });

    setTimeout(() => {
      navigate("/Otp");
    }, 1500);
  }
 
  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-icon">📧</div>

        <h1 className="auth-heading">Verify email</h1>
        <p className="auth-subheading">
          Enter your registered email address to continue
        </p>

        <form onSubmit={handesubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handelchange}
              placeholder="you@example.com"
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
