import { useState, useCallback } from "react";
import { useAuth } from "../../context/AuthContext";

const Signup = ({ onClose, onSwitchToLogin }) => {
  const { signup } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiErr, setApiErr] = useState("");

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((e) => ({ ...e, [name]: "" }));
  }, []);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    if (form.password.length < 6) e.password = "Min. 6 characters";
    if (form.password !== form.confirm) e.confirm = "Passwords do not match";
    return e;
  };

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const errs = validate();
      if (Object.keys(errs).length) {
        setErrors(errs);
        return;
      }
      setLoading(true);
      setApiErr("");
      try {
        signup(form);
        onClose();
      } catch (err) {
        setApiErr(err.message);
      } finally {
        setLoading(false);
      }
    },
    [form, signup, onClose],
  );

  const fields = [
    { name: "name", label: "Full Name", type: "text", ph: "Rohit Sharma" },
    {
      name: "email",
      label: "Email Address",
      type: "email",
      ph: "you@example.com",
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      ph: "Min. 6 characters",
    },
    {
      name: "confirm",
      label: "Confirm Password",
      type: "password",
      ph: "Re-enter password",
    },
  ];

  return (
    <div className="overlay" onClick={onClose}>
      <div
        className="card scale-up w-full max-w-md p-8"
        onClick={(e) => e.stopPropagation()}
        style={{ maxHeight: "90vh", overflowY: "auto" }}
      >
        {/* Close */}
        <div className="flex items-start justify-between mb-7">
          <div>
            <h2
              style={{
                fontFamily: "var(--font-head)",
                fontSize: "1.6rem",
                fontWeight: 700,
                color: "var(--text)",
              }}
            >
              Join Cricket Fever 🏏
            </h2>
            <p
              style={{
                color: "var(--text-muted)",
                fontSize: ".875rem",
                marginTop: 4,
              }}
            >
              Create your account to follow every match live.
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              width: 34,
              height: 34,
              borderRadius: 8,
              border: "1px solid var(--border)",
              background: "transparent",
              color: "var(--text-muted)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.1rem",
              flexShrink: 0,
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.borderColor = "var(--green)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.borderColor = "var(--border)")
            }
          >
            ✕
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: 16 }}
        >
          {fields.map((f) => (
            <div key={f.name}>
              <label
                style={{
                  display: "block",
                  fontSize: ".8rem",
                  fontWeight: 600,
                  color: "var(--text-muted)",
                  marginBottom: 6,
                  letterSpacing: ".02em",
                }}
              >
                {f.label}
              </label>
              <input
                className="inp"
                name={f.name}
                type={f.type}
                value={form[f.name]}
                onChange={handleChange}
                placeholder={f.ph}
              />
              {errors[f.name] && (
                <p
                  style={{
                    color: "var(--red)",
                    fontSize: ".78rem",
                    marginTop: 4,
                  }}
                >
                  {errors[f.name]}
                </p>
              )}
            </div>
          ))}

          {apiErr && (
            <div
              className="fade-in"
              style={{
                background: "rgba(239,68,68,.1)",
                border: "1px solid rgba(239,68,68,.3)",
                borderRadius: 10,
                padding: "10px 14px",
                color: "var(--red)",
                fontSize: ".85rem",
              }}
            >
              {apiErr}
            </div>
          )}

          <button
            className="btn-green"
            type="submit"
            disabled={loading}
            style={{ marginTop: 4, width: "100%", padding: "12px" }}
          >
            {loading ? "Creating account…" : "Create Account →"}
          </button>
        </form>

        <div
          style={{
            borderTop: "1px solid var(--border)",
            marginTop: 24,
            paddingTop: 18,
            textAlign: "center",
            color: "var(--text-muted)",
            fontSize: ".875rem",
          }}
        >
          Already have an account?{" "}
          <button
            onClick={onSwitchToLogin}
            style={{
              color: "var(--green)",
              fontWeight: 700,
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
