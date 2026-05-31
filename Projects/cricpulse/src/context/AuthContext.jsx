import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore session
  useEffect(() => {
    try {
      const saved = localStorage.getItem("cf_user");
      if (saved) setUser(JSON.parse(saved));
    } catch {
      /* ignore */
    }
    setLoading(false);
  }, []);

  const signup = useCallback(({ name, email, password }) => {
    const users = JSON.parse(localStorage.getItem("cf_users") || "[]");
    if (users.find((u) => u.email === email))
      throw new Error("Email already registered!");
    const newUser = {
      id: Date.now(),
      name: name.trim(),
      email,
      avatar: name.trim()[0].toUpperCase(),
    };
    users.push({ ...newUser, password });
    localStorage.setItem("cf_users", JSON.stringify(users));
    localStorage.setItem("cf_user", JSON.stringify(newUser));
    setUser(newUser);
    return newUser;
  }, []);

  const login = useCallback(({ email, password }) => {
    const users = JSON.parse(localStorage.getItem("cf_users") || "[]");
    const found = users.find(
      (u) => u.email === email && u.password === password,
    );
    if (!found) throw new Error("Invalid email or password!");
    const { password: _, ...safe } = found;
    localStorage.setItem("cf_user", JSON.stringify(safe));
    setUser(safe);
    return safe;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("cf_user");
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
};
