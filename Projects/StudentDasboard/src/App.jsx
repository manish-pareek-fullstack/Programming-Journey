import { BrowserRouter, Routes, Route } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { lazy, Suspense } from "react";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import LoginSuccess from "./LoginSuccess";
// Lazy Imports
const Header = lazy(() => import("./Header"));
const Home = lazy(() => import("./Home"));
const Signup = lazy(() => import("./Signup"));
const Login = lazy(() => import("./Login"));
const Protect = lazy(() => import("./Protect"));
const Forget = lazy(() => import("./Forget"));
const Otp = lazy(() => import("./Otp"));
const Email = lazy(() => import("./Email"));
const User = lazy(() => import("./User"));
function App() {
  return (
    <BrowserRouter>
      {" "}
     
      {/* Toast Container MUST be inside Router */}
      <ToastContainer
        position="top-right"
        autoClose={1500}
        pauseOnHover={false}
      />
      {/* Suspense with fallback (IMPORTANT) */}
      <Suspense fallback={<div>Loading...</div>}>
        <Header />

        <Routes>
          <Route
            path="/Student Records"
            element={
              <Protect>
                <User />
              </Protect>
            }
          />
          <Route path="/LoginSuccess" element={<LoginSuccess />} />
          <Route path="/Forget" element={<Forget />} />
          <Route path="/Email" element={<Email />} />
          <Route path="/Otp" element={<Otp />} />
          <Route path="/" element={<Home />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Protect" element={<Protect />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
