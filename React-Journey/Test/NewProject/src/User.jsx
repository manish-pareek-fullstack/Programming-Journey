import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

const User = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);

  // API CALL
  useEffect(() => {
    fetch("https://dummyjson.com/users")
      .then((res) => res.json())
      .then((api) => {
        setData(api.users);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <Loader fullPage={false} label="Fetching students" />;

  // SEARCH FILTER
  const filterData = data.filter(
    (item) =>
      item.firstName.toLowerCase().includes(search.toLowerCase()) ||
      item.email.toLowerCase().includes(search.toLowerCase()),
  );

  const sortData =
    sortBy === "age"
      ? [...filterData].sort((a, b) => a.age - b.age)
      : sortBy === "name"
        ? [...filterData].sort((a, b) => a.firstName.localeCompare(b.firstName))
        : filterData;

  function handleDelete(id) {
    setData(data.filter((item) => item.id !== id));
    toast.success("Record deleted");
  }

  const handleEdit = (user) => {
    setFormData(user);
    setShowModal(true);
  };

  const updatehandel = () => {
    const res = data.map((item) => (item.id === formData.id ? formData : item));
    setData(res);
    setShowModal(false);
    toast.success(`${formData.firstName} updated successfully`);
  };

  return (
    <div className="user-page">
      {/* Header row */}
      <div className="user-page-header">
        <h2 className="user-page-title">
          <span>Student</span> Records
        </h2>
      </div>

      {/* Back button */}
      <button className="back-btn" onClick={() => navigate(-1)}>
        <span className="back-icon">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </span>
        Back
      </button>

      {/* Table Controls */}
      <div className="table-controls">
        <input
          type="search"
          placeholder="Search by name or email..."
          onChange={(e) => setSearch(e.target.value)}
        />
        <select onChange={(e) => setSortBy(e.target.value)}>
          <option value="">Sort by</option>
          <option value="age">Age</option>
          <option value="name">Name</option>
        </select>
      </div>

      {/* TABLE */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Edit</th>
            <th>Delete</th>
            <th>State</th>
          </tr>
        </thead>
        <tbody>
          {sortData.length === 0 ? (
            <tr>
              <td colSpan="9">
                <div className="table-empty">
                  {/* Empty icon */}
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                    <path d="M8 11h6" />
                  </svg>
                  No records found
                </div>
              </td>
            </tr>
          ) : (
            sortData.map((x) => (
              <tr key={x.id}>
                <td>{x.id}</td>
                <td style={{ fontWeight: 600 }}>
                  {x.firstName} {x.lastName}
                </td>
                <td style={{ color: "var(--text-muted)", fontSize: "0.82rem" }}>
                  {x.email}
                </td>
                <td>{x.phone}</td>
                <td>{x.age}</td>
                <td>
                  <span className={`gender-badge ${x.gender}`}>
                    {x.gender === "male" ? "♂" : "♀"} {x.gender}
                  </span>
                </td>
                <td>
                  <button
                    className="table-action-btn edit"
                    onClick={() => handleEdit(x)}
                  >
                    {/* Pencil icon */}
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    className="table-action-btn delete"
                    onClick={() => handleDelete(x.id)}
                  >
                    {/* Trash icon */}
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                      <path d="M10 11v6M14 11v6" />
                      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                    </svg>
                    Delete
                  </button>
                </td>
                <td>
                  <button className="table-action-btn state">
                    {/* Info icon */}
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    Info
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* MODAL */}
      {showModal && (
        <div className="modal">
          <h2>Edit Student</h2>

          <label>ID</label>
          <input type="text" value={formData?.id || ""} disabled />

          <label>Name</label>
          <input
            type="text"
            value={formData?.firstName || ""}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
          />

          <label>Email</label>
          <input
            type="email"
            value={formData?.email || ""}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />

          <label>Phone</label>
          <input
            type="text"
            value={formData?.phone || ""}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
          />

          <label>Age</label>
          <input
            type="number"
            value={formData?.age || ""}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
          />

          <button onClick={updatehandel}>Save Changes</button>
          <button onClick={() => setShowModal(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default User;
