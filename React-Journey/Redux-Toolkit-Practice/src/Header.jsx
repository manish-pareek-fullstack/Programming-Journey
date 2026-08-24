import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div>
      <Link to="/About">About</Link>
      <Link to="/">Home</Link>
      <Link to="/Login">Login</Link>
      <Link to="/Signup">Signup</Link>
      <Link to="/Tag">Tag</Link>
      <Link to="/Review">Review</Link>
      <Link to="/Dimention">Dimention</Link>
      <Link to="/Title">Title</Link>
    </div>
  );
}

export default Header
