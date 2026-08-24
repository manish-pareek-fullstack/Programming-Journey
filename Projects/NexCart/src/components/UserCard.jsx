import { useNavigate } from "react-router-dom";
import UserImage from "./UserImage";

const UserCard = ({ user }) => {

  const navigate = useNavigate();

  return (
    <div className="user-card">
      <UserImage id={user.id} />

      <div className="user-name">
        {user.firstName} {user.lastName}
      </div>

      <div className="user-meta">
        {user.gender} · Age {user.age} <br />
        {user.phone} <br />
        👁 {user.eyeColor}
      </div>

      <div className="card-actions">
        <button
          className="btn-detail"
          onClick={() => navigate(`/detail/${user.id}`)}
        >
          Detail
        </button>

        <button
          className="btn-recipe"
          onClick={() => navigate(`/recipe/${user.id}`)}
        >
          Recipe
        </button>

        <button
          className="btn-cart"
          onClick={() => {
            localStorage.setItem("selectedUser", JSON.stringify(user));
            navigate(`/cart/${user.id}`);
          }}
        >
          Cart
        </button>

        {/* ⭐ NEW BUTTON */}
      
      </div>
    </div>
  );
};

export default UserCard;
