import axios from "axios";
import { useEffect, useState } from "react";
import UserCard from "./UserCard";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [view, setView] = useState("card"); // "card" | "table"
  const navigate = useNavigate();
  const [searchLoading, setSearchLoading] = useState(false);

  const fetchData = async () => {
    try {
      const res = await axios.get("https://dummyjson.com/users");
      setUsers(res.data.users);
      localStorage.setItem("users", JSON.stringify(res.data.users));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setSearchLoading(true);
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setSearchLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  const filtered = users.filter((u) =>
    u.firstName.toLowerCase().includes(debouncedSearch.toLowerCase()),
  );

  const handleSort = (value) => {
    const sortedUsers = [...users];
    if (value === "ageAsc") sortedUsers.sort((a, b) => a.age - b.age);
    if (value === "ageDesc") sortedUsers.sort((a, b) => b.age - a.age);
    if (value === "nameAsc")
      sortedUsers.sort((a, b) => a.firstName.localeCompare(b.firstName));
    if (value === "nameDesc")
      sortedUsers.sort((a, b) => b.firstName.localeCompare(a.firstName));
    setUsers(sortedUsers);
  };

  const toggleView = () =>
    setView((prev) => (prev === "card" ? "table" : "card"));

  if (loading) return <Loader />;
  if (users.length === 0) return <h2 className="no-data">No Data Found</h2>;

  return (
    <div className="home-container">
      {/* ── HERO ── */}
      <div className="home-hero">
        <h1>
          Discover <span>People</span>
        </h1>
        <p>Browse profiles, explore recipes and manage your cart.</p>
      </div>

      {/* ── CONTROLS BAR ── */}
      <div className="home-controls">
        <div className="search-wrapper">
          <span className="search-icon">🔍</span>
          <input
            placeholder="Search by name..."
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
        </div>

        <select
          className="sort-select"
          onChange={(e) => handleSort(e.target.value)}
        >
          <option value="">⇅ Sort Users</option>
          <option value="ageAsc">Age ↑ Ascending</option>
          <option value="ageDesc">Age ↓ Descending</option>
          <option value="nameAsc">Name A → Z</option>
          <option value="nameDesc">Name Z → A</option>
        </select>

        <button className="btn-orders" onClick={() => navigate("/MyAllOrders")}>
          📦 My Orders
        </button>

        {/* ── SINGLE TOGGLE BUTTON ── */}
        <button
          className={`btn-view-toggle ${view === "table" ? "active-table" : "active-card"}`}
          onClick={toggleView}
        >
          <span className="toggle-icon">{view === "card" ? "☰" : "⊞"}</span>
          <span className="toggle-label">
            {view === "card" ? "Table View" : "Card View"}
          </span>
        </button>
      </div>

      {/* ── RESULT COUNT ── */}
      <div className="result-count">
        Showing <strong>{filtered.length}</strong> of{" "}
        <strong>{users.length}</strong> users
      </div>

      {/* ── CARD VIEW ── */}
      {view === "card" && (
        <div className="user-grid view-fade-in">
          {searchLoading ? (
            <Loader />
          ) : filtered.length === 0 ? (
            <p className="no-data">No users found for "{debouncedSearch}"</p>
          ) : (
            filtered.map((u, i) => (
              <div
                className="user-card-wrapper card-pop-in"
                key={u.id}
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <UserCard user={u} />
              </div>
            ))
          )}
        </div>
      )}

      {/* ── TABLE VIEW ── */}
      {view === "table" && (
        <div className="table-wrapper view-fade-in">
          <table className="users-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Avatar</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Phone</th>
                <th>City</th>
                <th>Company</th>
                <th>Blood Group</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u, i) => (
                <tr
                  key={u.id}
                  className="table-row row-slide-in"
                  style={{ animationDelay: `${i * 30}ms` }}
                  onClick={() => navigate(`/user/${u.id}`)}
                  title="Click to view profile"
                >
                  <td className="table-index">{i + 1}</td>
                  <td>
                    <LazyLoadImage
                      src={`https://randomuser.me/api/portraits/${
                        u.gender === "female" ? "women" : "men"
                      }/${u.id}.jpg`}
                      width={42}
                      height={42}
                      className="table-avatar"
                      alt={u.firstName}
                      effect="blur"
                    />
                  </td>
                  <td className="table-name">
                    <span className="name-text">
                      {u.firstName} {u.lastName}
                    </span>
                    <span className="username-text">@{u.username}</span>
                  </td>
                  <td className="table-email">{u.email}</td>
                  <td>
                    <span className="age-badge">{u.age}y</span>
                  </td>
                  <td>
                    <span className={`gender-badge gender-${u.gender}`}>
                      {u.gender === "female" ? "♀" : "♂"} {u.gender}
                    </span>
                  </td>
                  <td className="table-phone">{u.phone}</td>
                  <td className="table-city">📍 {u.address?.city || "—"}</td>
                  <td className="table-company">🏢 {u.company?.name || "—"}</td>
                  <td>
                    <span className="blood-badge">{u.bloodGroup || "—"}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Home;
