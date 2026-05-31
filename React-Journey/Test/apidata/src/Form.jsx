import React, { useState } from "react";
import { Link } from "react-router-dom";

const Form = ({ form, setForm }) => {
  const [error, setError] = useState({
    name: "",
    email: "",
    password: "",
    course: "",
    age: "",
  });

  console.log("form in Form:", form);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });

    console.log("changed:", name, value);

    if (value === "") {
      setError((prev) => ({
        ...prev,
        [name]: `${name} is required`,
      }));
    } else {
      setError((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

 function handleSubmit(e) {
   e.preventDefault();

   let newError = {};

   Object.keys(form).forEach((key) => {
     if (form[key] === "") {
       newError[key] = `${key} is required`;
     }
   });

   setError(newError);

   if (Object.keys(newError).length > 0) return;

   localStorage.setItem("signup", JSON.stringify(form));

   console.log("submitted form:", form);
 }

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Enter name"
      />
      <p>{error.name}</p>

      <input
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Enter email"
      />
      <p>{error.email}</p>

      <input
        name="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Enter password"
      />
      <p>{error.password}</p>

      <select name="age" value={form.age} onChange={handleChange}>
        <option value="">Select age</option>
        <option value="18">18</option>
        <option value="19">19</option>
        <option value="20">20</option>
        <option value="21">21</option>
        <option value="22">22</option>
        <option value="23">23</option>
        <option value="24">24</option>
      </select>
      <p>{error.age}</p>

      <select name="course" value={form.course} onChange={handleChange}>
        <option value="">Select course</option>
        <option value="mca">MCA</option>
        <option value="bca">BCA</option>
        <option value="bcom">B.Com</option>
      </select>
      <p>{error.course}</p>

      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
