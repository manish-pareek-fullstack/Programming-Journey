import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Otp = () => {
  const [otp, setotp] = useState({
    first: "",
    second: "",
    three: "",
    four: "",
  });
  const [error, seterror] = useState({});
  const [generateOTP, setgenerateOTP] = useState("");
  const [toggel, settoggel] = useState(false);
  const [timer, settimer] = useState(30);

  const navigate = useNavigate();
  const timerRef = useRef(30);
  const intervalRef = useRef(null);

  const changehandel = (e) => {
    const { name, value } = e.target;
    if (value.length > 1) return;
    if (!/^[0-9]*$/.test(value)) return;
    setotp((prev) => ({ ...prev, [name]: value }));
    seterror((prev) => ({
      ...prev,
      [name]: value === "" ? `${name} is required` : "",
    }));
  };

  const handelotp = () => {
    toast.success("OTP sent successfully");
    const randomOtp = Math.floor(1000 + Math.random() * 9000).toString();
    setgenerateOTP(randomOtp);
    localStorage.setItem("randomOtp", JSON.stringify(randomOtp));
    settoggel(true);
    timerRef.current = 30;
    settimer(30);
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      timerRef.current--;
      settimer(timerRef.current);
      if (timerRef.current === 0) {
        clearInterval(intervalRef.current);
        settoggel(false);
        timerRef.current = 30;
        settimer(30);
      }
    }, 1000);
  };

  const handelsubmit = (e) => {
    e.preventDefault();
    const userOTP = otp.first + otp.second + otp.three + otp.four;
    if (
      otp.first === "" ||
      otp.second === "" ||
      otp.three === "" ||
      otp.four === ""
    ) {
      seterror({
        first: otp.first === "" ? "required" : "",
        second: otp.second === "" ? "required" : "",
        three: otp.three === "" ? "required" : "",
        four: otp.four === "" ? "required" : "",
      });
      return;
    }
    if (userOTP.length < 4) {
      toast.error("Please enter complete OTP");
      return;
    }
    if (generateOTP !== userOTP) {
      toast.error("Invalid OTP");
      return;
    }
    toast.success("OTP Verified Successfully");
    setTimeout(() => {
      navigate("/Forget");
    }, 1500);
  };

  const otpFields = ["first", "second", "three", "four"];

  return (
    <div className="auth-page">
      <div className="auth-card">
        <button className="btn-back" onClick={() => navigate(-1)}>
          Back
        </button>

        <div className="auth-icon">⬡</div>
        <h1 className="auth-heading">Enter OTP</h1>
        <p className="auth-subheading">
          We've sent a 4-digit code — enter it below
        </p>

        <form onSubmit={handelsubmit}>
          <div className="otp-group">
            {otpFields.map((field) => (
              <input
                key={field}
                className={`otp-input${otp[field] ? " filled" : ""}`}
                name={field}
                value={otp[field]}
                onChange={changehandel}
                maxLength={1}
                inputMode="numeric"
              />
            ))}
          </div>

          <div className="otp-errors">
            {otpFields.map((field) => (
              <span key={field} className="otp-single-error">
                {error[field] || ""}
              </span>
            ))}
          </div>

          <button
            type="submit"
            className="btn-primary"
            style={{ marginTop: "1.5rem" }}
          >
            Verify OTP
          </button>
        </form>

        <button className="btn-otp" onClick={handelotp} disabled={toggel}>
          {toggel ? `Resend OTP in ${timer}s` : "Send OTP"}
        </button>

        {toggel && (
          <p className="otp-timer">
            Code expires in <span>{timer}s</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Otp;
