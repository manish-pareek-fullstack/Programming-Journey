import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import Home from "./pages/Home";
import Footer from "./components/Footer";

/**
 * App.jsx – Root component
 * Providers wrap everything:
 * 1. ThemeProvider – dark/light mode (localStorage persisted)
 * 2. AuthProvider  – login/signup state (localStorage persisted)
 */
function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Home />
        <Footer />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
