import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../Loader";

const DepartmentManagement = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);

  const [form, setForm] = useState({ name: "", description: "" });

  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState("");
  const [editForm, setEditForm] = useState({ name: "", description: "" });

  const getDepartments = async () => {
    try {
      setLoading(true);

      const res = await axios.get("http://localhost:5000/departments", {
        withCredentials: true,
      });

      setDepartments(res.data.data || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch departments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDepartments();
  }, []);

  // ================= CREATE =================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      toast.error("Department name is required");
      return;
    }

    try {
      setBtnLoading(true);

      await axios.post("http://localhost:5000/departments", form, {
        withCredentials: true,
      });

      toast.success("Department created successfully");
      setForm({ name: "", description: "" });
      getDepartments();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setBtnLoading(false);
    }
  };

  // ================= EDIT =================

  const handleEdit = (dep) => {
    setEditId(dep._id);
    setEditForm({ name: dep.name, description: dep.description || "" });
    setShowModal(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!editForm.name.trim()) {
      toast.error("Department name is required");
      return;
    }

    try {
      setBtnLoading(true);

      await axios.patch(
        `http://localhost:5000/departments/${editId}`,
        editForm,
        { withCredentials: true },
      );

      toast.success("Department updated successfully");
      setShowModal(false);
      setEditId("");
      getDepartments();
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setBtnLoading(false);
    }
  };

  // ================= DELETE =================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this department?",
    );
    if (!confirmDelete) return;

    try {
      setBtnLoading(true);

      await axios.delete(`http://localhost:5000/departments/${id}`, {
        withCredentials: true,
      });

      toast.success("Department deleted successfully");
      getDepartments();
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    } finally {
      setBtnLoading(false);
    }
  };

  return (
    <div>
      <h2>Department Management</h2>

      <h3>Add Department</h3>
      <form className="dash-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Department Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description (optional)"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <button type="submit" disabled={btnLoading}>
          {btnLoading ? "Adding..." : "Add Department"}
        </button>
      </form>

      {loading ? (
        <Loader />
      ) : (
        <table className="dash-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {departments.length !== 0 ? (
              departments.map((dep) => (
                <tr key={dep._id}>
                  <td>{dep.name}</td>
                  <td>{dep.description || "-"}</td>
                  <td>
                    <button
                      className="dash-btn-edit"
                      onClick={() => handleEdit(dep)}
                    >
                      Edit
                    </button>
                    <button
                      className="dash-btn-delete"
                      disabled={btnLoading}
                      onClick={() => handleDelete(dep._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No departments found</td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {showModal && (
        <div className="dash-modal-overlay">
          <div className="dash-modal">
            <h2>Edit Department</h2>

            <form
              onSubmit={handleUpdate}
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <input
                type="text"
                placeholder="Department Name"
                value={editForm.name}
                onChange={(e) =>
                  setEditForm({ ...editForm, name: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Description"
                value={editForm.description}
                onChange={(e) =>
                  setEditForm({ ...editForm, description: e.target.value })
                }
              />

              <div>
                <button type="submit" disabled={btnLoading}>
                  {btnLoading ? "Updating..." : "Update"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditId("");
                  }}
                  style={{ marginLeft: "10px" }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DepartmentManagement;
