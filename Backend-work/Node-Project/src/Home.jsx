import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [dark, setDark] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  // GET
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await fetch("http://localhost:5000/form");
    const data = await res.json();
    setUsers(data.array);
  };

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      toast.error("All fields required");
      return;
    }

    const res = await fetch("http://localhost:5000/form", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    await res.json();

    toast.success("User Added");

    fetchUsers();

    setForm({ name: "", email: "", password: "" });
  };

  // DELETE
  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/form/${id}`, {
      method: "DELETE",
    });

    toast.success("Deleted");

    fetchUsers();
  };

  // EDIT
  const handleEdit = (item) => {
    setForm(item);
    setEditId(item.id);
  };

  // UPDATE (PUT)
  const updateUser = async () => {
    await fetch(`http://localhost:5000/form/${editId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    toast.success("Updated");

    setEditId(null);
    setForm({ name: "", email: "", password: "" });

    fetchUsers();
  };

  // PATCH (email only example)
  const handlePatch = async (id) => {
    const email = prompt("Enter new email");

    if (!email) return;

    await fetch(`http://localhost:5000/form/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    toast.success("Email updated");

    fetchUsers();
  };

  // SEARCH
  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase()),
  );

  // SORT
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.name.localeCompare(b.name);
    } else {
      return b.name.localeCompare(a.name);
    }
  });

  return (
    <div
      style={{
        background: dark ? "#111" : "#fff",
        color: dark ? "#fff" : "#000",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      {/* HEADER */}
      <h1>CRUD PROJECT</h1>

      {/* DARK MODE */}
      <button onClick={() => setDark(!dark)}>Toggle Dark Mode</button>

      {/* SEARCH */}
      <input
        placeholder="Search user..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* SORT */}
      <button onClick={() => setSortOrder("asc")}>A-Z</button>
      <button onClick={() => setSortOrder("desc")}>Z-A</button>

      <hr />

      {/* FORM */}
      <form onSubmit={editId ? updateUser : handleSubmit}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button type="submit">{editId ? "Update" : "Submit"}</button>
      </form>

      <hr />

      {/* LIST */}
      {sortedUsers.length === 0 ? (
        <p>No Users Found</p>
      ) : (
        sortedUsers.map((item) => (
          <div
            key={item.id}
            style={{
              border: "1px solid gray",
              margin: "10px",
              padding: "10px",
            }}
          >
            <p>{item.name}</p>
            <p>{item.email}</p>

            <button onClick={() => handleDelete(item.id)}>Delete</button>
            <button onClick={() => handleEdit(item)}>Edit</button>
            <button onClick={() => handlePatch(item.id)}>Patch Email</button>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
