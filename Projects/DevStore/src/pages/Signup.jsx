import React, { useState } from "react";

const Signup = () => {
  const [form, setform] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
    last: "",
    age: "",
    number: "",
    date: "",
    address: "",
    city: "",
    gender: "",
    skills: [],
  });

  const [error, seterror] = useState({});

  function handelsubmit(e) {
    e.preventDefault();
    let obj = {};

    if (form.name === "") obj.name = "name is req";
    if (form.email === "") obj.email = "email is req";
    if (form.password === "") obj.password = "pass is req";

    seterror(obj);

    if (Object.keys(obj).length === 0) {
      // ✅ FIX (yaha galti thi)
      const existingUsers = JSON.parse(localStorage.getItem("user")) || [];

      const alreadyUser = existingUsers.find((u) => u.email === form.email);

      if (alreadyUser) {
        alert("User already exists ❌");
        return;
      }

      existingUsers.push(form);
      localStorage.setItem("user", JSON.stringify(existingUsers));

      setform({
        name: "",
        email: "",
        password: "",
        confirm: "",
        last: "",
        age: "",
        number: "",
        date: "",
        address: "",
        city: "",
        gender: "",
        skills: [],
      });
    }
  }

  return (
    <div>
      <form onSubmit={handelsubmit}>
        <input
          type="text"
          placeholder="enter the name"
          value={form.name}
          onChange={(e) => setform({ ...form, name: e.target.value })}
        />
        <div>{error.name}</div>

        <input
          type="email"
          placeholder="enter the email"
          value={form.email}
          onChange={(e) => setform({ ...form, email: e.target.value })}
        />
        <div>{error.email}</div>

        <input
          type="password"
          placeholder="enter the password"
          value={form.password}
          onChange={(e) => setform({ ...form, password: e.target.value })}
        />
        <div>{error.password}</div>

        <br />

        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default Signup;
