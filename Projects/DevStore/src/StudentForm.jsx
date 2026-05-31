import { useState, useEffect } from "react";

const StudentForm = ({ onSubmit, onCancel, editData }) => {
  const [form, setForm] = useState({
    name: "",
    age: "",
    email: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editData) {
      setForm(editData);
    }
  }, [editData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let err = {};

    if (!form.name) err.name = "Name required";
    if (!form.age) err.age = "Age required";
    if (!form.email) err.email = "Email required";

    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSubmit(form); 

    setForm({
      name: "",
      age: "",
      email: "",
    });

    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{editData ? "Edit Student" : "Add Student"}</h2>

      {/* NAME */}
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
      />
      {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}

      {/* AGE */}
      <input
        type="number"
        name="age"
        placeholder="Age"
        value={form.age}
        onChange={handleChange}
      />
      {errors.age && <p style={{ color: "red" }}>{errors.age}</p>}

      {/* EMAIL */}
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />
      {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}

      {/* BUTTONS */}
      <button type="submit">{editData ? "Update" : "Add"}</button>

      {editData && (
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      )}
    </form>
  );
};

export default StudentForm;
