import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./Loader";

const User = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
  });

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
  });

  // ================= GET USERS =================

  const getUsers = async () => {
    try {
      setLoading(true);

      const res = await axios.get("http://localhost:5000/users");

      setData(res.data);
    } catch (error) {
      toast.error("Failed to fetch students");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getUsers();
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
    
  }, [search]);

  // ================= ADD USER =================
  const validateForm = (user) => {
    if (!user.name.trim()) {
      toast.error("Name is required");
      return false;
    }

    if (user.name.trim().length < 3) {
      toast.error("Name must be at least 3 characters");
      return false;
    }

    if (!user.email.trim()) {
      toast.error("Email is required");
      return false;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!emailRegex.test(user.email)) {
      toast.error("Invalid Email");
      return false;
    }

    if (!user.phone.trim()) {
      toast.error("Phone Number is required");
      return false;
    }

    if (!/^[0-9]{10}$/.test(user.phone)) {
      toast.error("Phone Number must be 10 digits");
      return false;
    }

    if (!user.age) {
      toast.error("Age is required");
      return false;
    }

    if (user.age < 18 || user.age > 60) {
      toast.error("Age must be between 18 and 60");
      return false;
    }

    if (!user.gender) {
      toast.error("Please Select Gender");
      return false;
    }

    return true;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm(form)) {
      return;
    }

    try {
      // Check email already exists
      const checkEmail = await axios.get(
        `http://localhost:5000/users?email=${form.email}`,
      );

      if (checkEmail.data.length > 0) {
        toast.error("Email already exists");

        return;
      }

      setBtnLoading(true);

      await axios.post("http://localhost:5000/users", form);

      toast.success("Student Added Successfully");

      setForm({
        name: "",
        email: "",
        phone: "",
        age: "",
        gender: "",
      });

      getUsers();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setBtnLoading(false);
    }
  };
  // ================= DELETE =================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?",
    );

    if (!confirmDelete) {
      return;
    }

    try {
      setBtnLoading(true);

      await axios.delete(`http://localhost:5000/users/${id}`);

      toast.success("Student Deleted Successfully");

      getUsers();
    } catch (error) {
      toast.error("Delete Failed");
    } finally {
      setBtnLoading(false);
    }
  };
  // ================= EDIT =================

  const handleEdit = (item) => {
    setEditId(item._id);

    setEditForm({
      name: item.name,
      email: item.email,
      phone: item.phone,
      age: item.age,
      gender: item.gender,
    });

    setShowModal(true);
  };
  // ================= UPDATE =================

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!validateForm(editForm)) {
      return;
    }

    try {
      setBtnLoading(true);

      await axios.patch(`http://localhost:5000/users/${editId}`, editForm);

      toast.success("Student Updated Successfully");

      setShowModal(false);

      getUsers();
    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Update Failed");
      }
    } finally {
      setBtnLoading(false);
    }
  };
  // ================= SEARCH =================

  const filterData = data
    .filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortOrder === "ageLow") {
        return a.age - b.age;
      }
      if (sortOrder === "ageHigh") {
        return b.age - a.age;
      }
      if (sortOrder === "asc") {
        return a.name?.localeCompare(b.name);
      }
      if (sortOrder === "desc") {
        return b.name?.localeCompare(a.name);
      }

      return 0;
    });
  if (loading) {
    return <Loader />;
  }
  return (
    <div>
      <ToastContainer position="top-right" autoClose={2000} theme="colored" />

      <h2>Student Management</h2>

      <button onClick={() => navigate(-1)}>Back</button>

      <hr />

      <h3>Add Student</h3>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="text"
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />

        <input
          type="number"
          placeholder="Age"
          value={form.age}
          onChange={(e) => setForm({ ...form, age: e.target.value })}
        />

        <select
          value={form.gender}
          onChange={(e) => setForm({ ...form, gender: e.target.value })}
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <button type="submit" disabled={btnLoading}>
          {btnLoading ? "Adding..." : "Add Student"}
        </button>
      </form>

      <br />

      <div className="table-controls">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="asc">Name A-Z</option>
          <option value="desc">Name Z-A</option>
          <option value="ageLow">Age Low to High</option>
          <option value="ageHigh">Age High to Low</option>
        </select>
      </div>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filterData.length !== 0
            ? filterData.map((item) => (
                <tr key={item._id}>
                  <td>{item._id}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>{item.age}</td>
                  <td>{item.gender}</td>

                  <td>
                    <button onClick={() => handleEdit(item)}>Edit</button>

                    <button
                      disabled={btnLoading}
                      onClick={() => handleDelete(item._id)}
                    >
                      {btnLoading ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))
            : "no data found"}
        </tbody>
      </table>

      {showModal && (
        <div>
          <h2>Edit Student</h2>

          <form onSubmit={handleUpdate}>
            <input
              type="text"
              value={editForm.name}
              onChange={(e) =>
                setEditForm({
                  ...editForm,
                  name: e.target.value,
                })
              }
            />

            <input
              type="email"
              value={editForm.email}
              onChange={(e) =>
                setEditForm({
                  ...editForm,
                  email: e.target.value,
                })
              }
            />

            <input
              type="text"
              value={editForm.phone}
              onChange={(e) =>
                setEditForm({
                  ...editForm,
                  phone: e.target.value,
                })
              }
            />

            <input
              type="number"
              value={editForm.age}
              onChange={(e) =>
                setEditForm({
                  ...editForm,
                  age: e.target.value,
                })
              }
            />

            <select
              value={editForm.gender}
              onChange={(e) =>
                setEditForm({
                  ...editForm,
                  gender: e.target.value,
                })
              }
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>

            <button type="submit">Update</button>

            <button
              type="button"
              onClick={() => {
                setShowModal(false);
                setEditId("");
              }}
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default User;
