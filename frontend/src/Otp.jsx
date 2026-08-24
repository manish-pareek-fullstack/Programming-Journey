import { useState, useRef, useEffect } from "react";

import { useNavigate, useLocation } from "react-router-dom";

import { toast } from "react-toastify";

import axios from "axios";

const Otp = () => {
  const [otp, setOtp] = useState({
    first: "",
    second: "",
    three: "",
    four: "",
    five: "",
    six: "",
  });

  const [error, setError] = useState({});

  const [loading, setLoading] = useState(false);

  const [timer, setTimer] = useState(60);

  const [canResend, setCanResend] = useState(false);

  const navigate = useNavigate();

  const location = useLocation();

  const email = location.state?.email;

  const inputRefs = useRef([]);

  const intervalRef = useRef(null);

  const otpFields = ["first", "second", "three", "four", "five", "six"];

  // ============================================
  // EMAIL CHECK
  // ============================================

  useEffect(() => {
    if (!email) {
      toast.error("Email session not found");

      navigate("/Email");
    }
  }, [email, navigate]);

  // ============================================
  // TIMER
  // ============================================

  const startTimer = () => {
    setTimer(60);
    setCanResend(false);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);

          setCanResend(true);

          return 0;
        }

        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    startTimer();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // ============================================
  // INPUT CHANGE
  // ============================================

  const handleChange = (e, index) => {
    const { name, value } = e.target;

    if (!/^[0-9]?$/.test(value)) {
      return;
    }

    setOtp((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (value && index < otpFields.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // ============================================
  // BACKSPACE
  // ============================================

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[otpFields[index]] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // ============================================
  // VERIFY OTP
  // ============================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    const otpValue = otpFields.map((field) => otp[field]).join("");

    if (otpValue.length !== 6) {
      toast.error("Please enter complete 6-digit OTP");

      return;
    }

    try {
      setLoading(true);

      await axios.post(
        "http://localhost:5000/verify-otp",

        {
          email,
          otp: otpValue,
        },

        {
          withCredentials: true,
        },
      );

      toast.success("OTP verified successfully");

      setTimeout(() => {
        navigate("/Forget");
      }, 1000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  // ============================================
  // RESEND OTP
  // ============================================

  const resendOTP = async () => {
    if (!canResend) {
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/forgot-password",

        {
          email,
        },

        {
          withCredentials: true,
        },
      );

      setOtp({
        first: "",
        second: "",
        three: "",
        four: "",
        five: "",
        six: "",
      });

      toast.success("New OTP sent successfully");

      startTimer();

      inputRefs.current[0]?.focus();
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to resend OTP");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <button className="btn-back" onClick={() => navigate(-1)}>
          ← Back
        </button>

        <div className="auth-icon">🔐</div>

        <h1 className="auth-heading">Enter OTP</h1>

        <p className="auth-subheading">
          We've sent a 6-digit code to
          <br />
          <strong>{email}</strong>
        </p>

        <form onSubmit={handleSubmit}>
          <div className="otp-group">
            {otpFields.map((field, index) => (
              <input
                key={field}
                ref={(el) => (inputRefs.current[index] = el)}
                className={`otp-input ${otp[field] ? "filled" : ""}`}
                name={field}
                value={otp[field]}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                maxLength={1}
                inputMode="numeric"
                disabled={loading}
              />
            ))}
          </div>

          {error.general && <span className="form-error">{error.general}</span>}

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        <button className="btn-otp" onClick={resendOTP} disabled={!canResend}>
          {canResend ? "Resend OTP" : `Resend OTP in ${timer}s`}
        </button>

        <p className="otp-timer">OTP is valid for 5 minutes</p>
      </div>
    </div>
  );
};

export default Otp;
