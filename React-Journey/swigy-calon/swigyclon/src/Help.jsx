import React from "react";
import { Link } from "react-router-dom";
function Help() {
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Help Center</h1>

      <p className="mb-3">
        If you have any problem with your order, you can contact us.
      </p>

      <p className="mb-3">Email: support@swiggy.com</p>

      <p>Phone: +91 9876543210</p>
    </div>
  );
}

export default Help;
