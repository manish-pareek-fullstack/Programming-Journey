import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { lazy, Suspense } from "react";
import "./App.css";
import Loader from "./Loader";
// Lazy Imports
const Header = lazy(() => import("./Header"));
const Home = lazy(() => import("./Home"));
const Signup = lazy(() => import("./Signup"));
const Login = lazy(() => import("./Login"));
const Protect = lazy(() => import("./Protect"));
const Forget = lazy(() => import("./Forget"));
const Otp = lazy(() => import("./Otp"));
const Email = lazy(() => import("./Email"));

function App() {
  const notify = () => {
    toast.success("Login Successful");
  };
  return (
    <>
    

      <ToastContainer
        autoClose={1500}
        pauseOnHover={false}
        position="top-right"
        theme="colored"
      />

      <BrowserRouter>
        {/* Suspense Start */}
        <Suspense fallback={<Loader />}>
          <Header />

          <Routes>
            <Route path="/Forget" element={<Forget />} />
            <Route path="/Email" element={<Email />} />
            <Route path="/Otp" element={<Otp />} />
            <Route path="/" element={<Home />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Protect" element={<Protect />} />
          </Routes>
        </Suspense>
        {/* Suspense End */}
      </BrowserRouter>
    </>
  );
}

export default App;
