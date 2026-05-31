import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="main-container">
      {/* SEARCH BAR */}
      <div className="search-box">
        <input type="text" placeholder="Search for restaurants or food" />
      </div>

      {/* RESTAURANT CARDS */}
      <div className="card-container">
        <div className="card">
          <img src="/src/assets/barger.png" />
          <div className="card-body">
            <h2>Burger King</h2>
            <p>Burgers, Fast Food</p>
            <span>⭐ 4.1 • 30-35 mins</span>
          </div>
        </div>

        <div className="card">
          <img src="/src/assets/pizza.png" />
          <div className="card-body">
            <h2>Pizza</h2>
            <p>Italian Pizza</p>
            <span>⭐ 4.1 • 30-35 mins</span>
          </div>
        </div>

        <div className="card">
          <img src="/src/assets/Biryani.jpg" />
          <div className="card-body">
            <h2>Behrouz Biryani</h2>
            <p>Biryani, Mughlai</p>
            <span>⭐ 4.5 • 35-40 mins</span>
          </div>
        </div>

        <div className="card">
          <img src="/src/assets/samosa.png" />
          <div className="card-body">
            <h2>Samosa</h2>
            <p>Snacks</p>
            <span>⭐ 4.3 • 20-25 mins</span>
          </div>
        </div>

        <div className="card">
          <img src="/src/assets/cofee.png" />
          <div className="card-body">
            <h2>Coffee</h2>
            <p>Cafe</p>
            <span>⭐ 4.3 • 20-25 mins</span>
          </div>
        </div>

        <div className="card">
          <img src="/src/assets/colddring.png" />
          <div className="card-body">
            <h2>Cold Drink</h2>
            <p>Beverages</p>
            <span>⭐ 4.3 • 20-25 mins</span>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-logo">
            <h2>Swiggy</h2>
            <p>© 2026 Swiggy Clone</p>
          </div>

          <div className="footer-section">
            <h3>Company</h3>
            <ul>
              <li>About</li>
              <li>Careers</li>
              <li>Team</li>
              <li>Swiggy One</li>
              <li>Instamart</li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Contact</h3>
            <ul>
              <li>Help & Support</li>
              <li>Partner With Us</li>
              <li>Ride With Us</li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Legal</h3>
            <ul>
              <li>Terms & Conditions</li>
              <li>Cookie Policy</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
