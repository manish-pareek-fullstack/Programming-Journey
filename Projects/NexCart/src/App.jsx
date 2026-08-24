import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./components/Home";
import UserDetail from "./components/UserDetail";
import Recipe from "./components/Recipe";
import Post from "./components/Post";
import Cart from "./components/Cart";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Signup from "./components/Signup";
import MyAllOrders from "./components/MyAllOrders";
import Wishlist from "./components/Wishlist";
import UseTheme from "./UseTheme";
import UserImage from "./components/UserImage";
import LoginSuccess from "./components/LoginSuccess";
import TableView from "./components/TableView";
import Header from "./components/Header";
function App() {
  UseTheme(); // sirf dark/light body class lagane ke liye
  return (
    <Suspense fallback={<h1>Loading data...</h1>}>
      <ToastContainer />
      <BrowserRouter>
       <Header/>
        <Routes>
          <Route path="/table" element={<TableView />} />
          <Route
            path="/login-success"
            element={
              <ProtectedRoute>
                <LoginSuccess />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/UsereImage" element={<UserImage />} />
          <Route
            path="/MyAllOrders"
            element={
              <ProtectedRoute>
                <MyAllOrders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/detail/:id"
            element={
              <ProtectedRoute>
                <UserDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/recipe/:id"
            element={
              <ProtectedRoute>
                <Recipe />
              </ProtectedRoute>
            }
          />
          <Route
            path="/post/:id"
            element={
              <ProtectedRoute>
                <Post />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart/:id"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route path="/Wishlist" element={<Wishlist />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
