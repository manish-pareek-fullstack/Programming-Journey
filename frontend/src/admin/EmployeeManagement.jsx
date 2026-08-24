import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../Loader";

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  department: "",
  designation: "",
  joiningDate: "",
  status: "active",
};

const EmployeeManagement = () => {
  const navigate = useNavigate();

  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);

  // search / filter / sort
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");

  // pagination
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  // add form
  const [form, setForm] = useState(emptyForm);

  // edit modal
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState("");
  const [editForm, setEditForm] = useState(emptyForm);

  // ================= LOAD DEPARTMENTS (for dropdown) =================

  const getDepartments = async () => {
    try {
      const res = await axios.get("http://localhost:5000/departments", {
        withCredentials: true,
      });
      setDepartments(res.data.data || []);
    } catch (error) {
      toast.error("Failed to load departments");
    }
  };

  // ================= LOAD EMPLOYEES =================

  const getEmployees = async () => {
    try {
      setLoading(true);

      const res = await axios.get("http://localhost:5000/employees", {
        withCredentials: true,
        params: {
          search: debouncedSearch,
          department: departmentFilter,
          status: statusFilter,
          sortBy,
          sortOrder,
          page,
          limit,
        },
      });

      setEmployees(res.data.data || []);
      setTotalPages(res.data.pagination?.totalPages || 1);
      setTotal(res.data.pagination?.total || 0);
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Please login first");
        navigate("/login");
        return;
      }

      if (error.response?.status === 403) {
        toast.error("Admins only");
        navigate("/");
        return;
      }

      toast.error(error.response?.data?.message || "Failed to fetch employees");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDepartments();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    getEmployees();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, departmentFilter, statusFilter, sortBy, sortOrder, page]);

  // ================= VALIDATION =================

  const validateForm = (emp) => {
    if (!emp.name.trim() || emp.name.trim().length < 3) {
      toast.error("Name must be at least 3 characters");
      return false;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(emp.email)) {
      toast.error("Invalid Email");
      return false;
    }

    if (!/^[0-9]{10}$/.test(emp.phone)) {
      toast.error("Phone Number must be 10 digits");
      return false;
    }

    if (!emp.department) {
      toast.error("Please select a department");
      return false;
    }

    if (!emp.designation.trim()) {
      toast.error("Designation is required");
      return false;
    }

    if (!emp.joiningDate) {
      toast.error("Joining date is required");
      return false;
    }

    return true;
  };

  // ================= CREATE =================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm(form)) return;

    try {
      setBtnLoading(true);

      await axios.post("http://localhost:5000/employees", form, {
        withCredentials: true,
      });

      toast.success("Employee added successfully");
      setForm(emptyForm);
      getEmployees();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
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
      department: item.department?._id || "",
      designation: item.designation,
      joiningDate: item.joiningDate ? item.joiningDate.slice(0, 10) : "",
      status: item.status,
    });
    setShowModal(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!validateForm(editForm)) return;

    try {
      setBtnLoading(true);

      await axios.patch(
        `http://localhost:5000/employees/${editId}`,
        editForm,
        { withCredentials: true },
      );

      toast.success("Employee updated successfully");
      setShowModal(false);
      setEditId("");
      getEmployees();
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setBtnLoading(false);
    }
  };

  // ================= DELETE =================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?",
    );
    if (!confirmDelete) return;

    try {
      setBtnLoading(true);

      await axios.delete(`http://localhost:5000/employees/${id}`, {
        withCredentials: true,
      });

      toast.success("Employee deleted successfully");
      getEmployees();
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    } finally {
      setBtnLoading(false);
    }
  };

  return (
    <div>
      <h2>Employee Management</h2>

      {/* ================= ADD EMPLOYEE ================= */}
      <h3>Add Employee</h3>
      <form className="dash-form" onSubmit={handleSubmit}>
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
        <select
          value={form.department}
          onChange={(e) => setForm({ ...form, department: e.target.value })}
        >
          <option value="">Select Department</option>
          {departments.map((dep) => (
            <option key={dep._id} value={dep._id}>
              {dep.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Designation"
          value={form.designation}
          onChange={(e) => setForm({ ...form, designation: e.target.value })}
        />
        <input
          type="date"
          value={form.joiningDate}
          onChange={(e) => setForm({ ...form, joiningDate: e.target.value })}
        />
        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        <button type="submit" disabled={btnLoading}>
          {btnLoading ? "Adding..." : "Add Employee"}
        </button>
      </form>

      {/* ================= SEARCH / FILTER / SORT ================= */}
      <div className="dash-controls">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={departmentFilter}
          onChange={(e) => {
            setDepartmentFilter(e.target.value);
            setPage(1);
          }}
        >
          <option value="">All Departments</option>
          {departments.map((dep) => (
            <option key={dep._id} value={dep._id}>
              {dep.name}
            </option>
          ))}
        </select>

        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setPage(1);
          }}
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        <select
          value={`${sortBy}-${sortOrder}`}
          onChange={(e) => {
            const [field, order] = e.target.value.split("-");
            setSortBy(field);
            setSortOrder(order);
          }}
        >
          <option value="createdAt-desc">Newest First</option>
          <option value="name-asc">Name A-Z</option>
          <option value="name-desc">Name Z-A</option>
          <option value="joiningDate-asc">Joining Date (Old-New)</option>
          <option value="joiningDate-desc">Joining Date (New-Old)</option>
        </select>
      </div>

      {/* ================= TABLE ================= */}
      {loading ? (
        <Loader />
      ) : (
        <>
          <table className="dash-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Department</th>
                <th>Designation</th>
                <th>Joining Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {employees.length !== 0 ? (
                employees.map((item) => (
                  <tr key={item._id}>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td>{item.department?.name || "-"}</td>
                    <td>{item.designation}</td>
                    <td>
                      {item.joiningDate
                        ? new Date(item.joiningDate).toLocaleDateString()
                        : "-"}
                    </td>
                    <td>
                      <span className={`dash-badge ${item.status}`}>
                        {item.status}
                      </span>
                    </td>
                    <td>
                      <button
                        className="dash-btn-edit"
                        onClick={() => handleEdit(item)}
                      >
                        Edit
                      </button>
                      <button
                        className="dash-btn-delete"
                        disabled={btnLoading}
                        onClick={() => handleDelete(item._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8">No employees found</td>
                </tr>
              )}
            </tbody>
          </table>

          {/* ================= PAGINATION ================= */}
          <div className="dash-pagination">
            <button
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
            >
              Previous
            </button>
            <span>
              Page {page} of {totalPages} ({total} total)
            </span>
            <button
              disabled={page >= totalPages}
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            >
              Next
            </button>
          </div>
        </>
      )}

      {/* ================= EDIT MODAL ================= */}
      {showModal && (
        <div className="dash-modal-overlay">
          <div className="dash-modal">
            <h2>Edit Employee</h2>

            <form
              onSubmit={handleUpdate}
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <input
                type="text"
                placeholder="Name"
                value={editForm.name}
                onChange={(e) =>
                  setEditForm({ ...editForm, name: e.target.value })
                }
              />
              <input
                type="email"
                placeholder="Email"
                value={editForm.email}
                onChange={(e) =>
                  setEditForm({ ...editForm, email: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Phone"
                value={editForm.phone}
                onChange={(e) =>
                  setEditForm({ ...editForm, phone: e.target.value })
                }
              />
              <select
                value={editForm.department}
                onChange={(e) =>
                  setEditForm({ ...editForm, department: e.target.value })
                }
              >
                <option value="">Select Department</option>
                {departments.map((dep) => (
                  <option key={dep._id} value={dep._id}>
                    {dep.name}
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Designation"
                value={editForm.designation}
                onChange={(e) =>
                  setEditForm({ ...editForm, designation: e.target.value })
                }
              />
              <input
                type="date"
                value={editForm.joiningDate}
                onChange={(e) =>
                  setEditForm({ ...editForm, joiningDate: e.target.value })
                }
              />
              <select
                value={editForm.status}
                onChange={(e) =>
                  setEditForm({ ...editForm, status: e.target.value })
                }
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>

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

export default EmployeeManagement;
