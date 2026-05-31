import { useState, useCallback } from "react";
import { useAuth } from "../../context/AuthContext";

const Login = ({ onClose, onSwitchToSignup }) => {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setError("");
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!form.email || !form.password) {
        setError("Please fill all fields.");
        return;
      }
      setLoading(true);
      setError("");
      try {
        login(form);
        onClose();
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    [form, login, onClose],
  );

  return (
    <div className="overlay" onClick={onClose}>
      <div
        className="card scale-up w-full max-w-sm p-8"
        onClick={(e) => e.stopPropagation()}
      >
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
              Welcome back 👋
            </h2>
            <p
              style={{
                color: "var(--text-muted)",
                fontSize: ".875rem",
                marginTop: 4,
              }}
            >
              Sign in to continue to Cricket Fever.
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
          <div>
            <label
              style={{
                display: "block",
                fontSize: ".8rem",
                fontWeight: 600,
                color: "var(--text-muted)",
                marginBottom: 6,
              }}
            >
              Email
            </label>
            <input
              className="inp"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label
              style={{
                display: "block",
                fontSize: ".8rem",
                fontWeight: 600,
                color: "var(--text-muted)",
                marginBottom: 6,
              }}
            >
              Password
            </label>
            <input
              className="inp"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
            />
          </div>

          {error && (
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
              {error}
            </div>
          )}

          <button
            className="btn-green"
            type="submit"
            disabled={loading}
            style={{ marginTop: 4, width: "100%", padding: "12px" }}
          >
            {loading ? "Signing in…" : "Sign In →"}
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
          Don't have an account?{" "}
          <button
            onClick={onSwitchToSignup}
            style={{
              color: "var(--green)",
              fontWeight: 700,
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
