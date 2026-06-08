import { useNavigate } from "react-router-dom";
import UseTheme from "../UseTheme"; // path apna check karo

const Header = () => {
  const navigate = useNavigate();
  const { theme, toggeltheme } = UseTheme();

  return (
    <div className="navbar">
      <span className="navbar-brand">
        🛒 <span>My</span>Shop
      </span>
      <div className="navbar-links">
        <button onClick={() => navigate("/")}>Home</button>
        <button onClick={() => navigate("/Wishlist")}>Wishlist</button>
        <button onClick={() => navigate("/MyAllOrders")}>Orders</button>
        <button className="btn-theme" onClick={toggeltheme}>
          {theme === "light" ? "🌙 Dark" : "☀️ Light"} 
        </button>
      
      </div>
    </div>
  );
};

export default Header;
