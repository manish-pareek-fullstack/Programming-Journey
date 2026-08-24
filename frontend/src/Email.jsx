import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Email = () => {
  const [form, setForm] = useState({
    email: "",
  });

  const [error, setError] = useState({
    email: "",
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError((prev) => ({
      ...prev,
      [name]: value === "" ? `${name} is required` : "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.email === "") {
      setError({
        email: "Email is required",
      });

      toast.error("Email is required");

      return;
    }

    try {
      setLoading(true);

      await axios.post(
        "http://localhost:5000/forgot-password",
        {
          email: form.email,
        },
        {
          withCredentials: true,
        },
      );

      toast.success("OTP sent successfully");

      setTimeout(() => {
        navigate("/Otp", {
          state: {
            email: form.email,
          },
        });
      }, 1000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to send OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-icon">📧</div>

        <h1 className="auth-heading">Verify email</h1>

        <p className="auth-subheading">
          Enter your registered email address to continue
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email</label>

            <input
              className="form-input"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              disabled={loading}
            />

            {error.email && <span className="form-error">{error.email}</span>}
          </div>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Sending OTP..." : "Verify Email"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Email;
