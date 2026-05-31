import { Link } from "react-router-dom";

function Header() {
  return (
    <nav className="bg-white shadow p-4 flex gap-6">
      <Link to="/" className="text-orange-600 font-bold">
        Swiggy
      </Link>

      <Link to="/">Home</Link>
      <Link to="/offers">Offers</Link>
      <Link to="/help">Help</Link>
      <Link to="/login">Sign In</Link>
    </nav>
  );
}

export default Header;
