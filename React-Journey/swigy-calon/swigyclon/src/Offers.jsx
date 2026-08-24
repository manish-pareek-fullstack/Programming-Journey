import React from "react";
import { Link } from "react-router-dom";
function Offers() {
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Today's Offers</h1>

      <div className="bg-orange-100 p-4 mb-4 rounded">
        <h2 className="font-bold">50% OFF</h2>
        <p>On your first order</p>
      </div>

      <div className="bg-orange-100 p-4 mb-4 rounded">
        <h2 className="font-bold">Free Delivery</h2>
        <p>On orders above ₹199</p>
      </div>

      <div className="bg-orange-100 p-4 rounded">
        <h2 className="font-bold">₹100 Cashback</h2>
        <p>Use code SWIGGY100</p>
      </div>
    </div>
  );
}

export default Offers;