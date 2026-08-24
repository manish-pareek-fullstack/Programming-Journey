import React, { useState } from "react";
import axios from "axios";

const About = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8000/user/create", form);

      alert("Data Submitted Successfully");
      console.log(res.data);

      setForm({
        name: "",
        email: "",
        password: "",
      });
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    }
  };

  return (
    <div style={{ width: "400px", margin: "50px auto" }}>
      <h2>User Form</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={form.name}
          onChange={handleChange}
        />
        <br />
        <br />

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={form.email}
          onChange={handleChange}
        />
        <br />
        <br />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={form.password}
          onChange={handleChange}
        />
        <br />
        <br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default About;
