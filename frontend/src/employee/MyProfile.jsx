import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader";

const MyProfile = () => {
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);

        const res = await axios.get("http://localhost:5000/employees/me", {
          withCredentials: true,
        });

        setEmployee(res.data.data);
      } catch (error) {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  if (loading) return <Loader />;

  if (notFound || !employee) {
    return (
      <div>
        <h2>My Profile</h2>
        <p>
          No employee record is linked to your account yet. Please contact
          your admin.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2>My Profile</h2>

      <div className="dash-card" style={{ maxWidth: "500px" }}>
        <p>
          <strong>Name:</strong> {employee.name}
        </p>
        <p>
          <strong>Email:</strong> {employee.email}
        </p>
        <p>
          <strong>Phone:</strong> {employee.phone}
        </p>
        <p>
          <strong>Department:</strong> {employee.department?.name || "-"}
        </p>
        <p>
          <strong>Designation:</strong> {employee.designation}
        </p>
        <p>
          <strong>Joining Date:</strong>{" "}
          {employee.joiningDate
            ? new Date(employee.joiningDate).toLocaleDateString()
            : "-"}
        </p>
        <p>
          <strong>Status:</strong>{" "}
          <span className={`dash-badge ${employee.status}`}>
            {employee.status}
          </span>
        </p>
      </div>
    </div>
  );
};

export default MyProfile;
