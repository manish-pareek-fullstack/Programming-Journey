import React from "react";
import { Link } from "react-router-dom";
function Login() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 shadow rounded-lg w-80">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>

        <input
          type="text"
          placeholder="Enter Email"
          className="w-full border p-2 mb-4 rounded"
        />

        <input
          type="password"
          placeholder="Enter Password"
          className="w-full border p-2 mb-4 rounded"
        />

        <button className="w-full bg-orange-500 text-white p-2 rounded">
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;