import { Link } from "react-router-dom";

const Notfound = () => {
  return (
    <div className="notfound">
      <div className="notfound__glitch" data-text="404">
        404
      </div>
      <h2 className="notfound__title">Page Not Found</h2>
      <p className="notfound__desc">
        Looks like you've wandered into the void. The page you're looking for
        doesn't exist.
      </p>
      <Link to="/" className="notfound__btn">
        ← Back to Home
      </Link>
      <div className="notfound__particles">
        {[...Array(12)].map((_, i) => (
          <span key={i} className="notfound__particle" style={{ "--i": i }} />
        ))}
      </div>
    </div>
  );
};

export default Notfound;
