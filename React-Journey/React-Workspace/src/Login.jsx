import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Login = () => {
  const userdata = useSelector((state) => state.signup);
  console.log('userdata',userdata);
  const [form, setform] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [userui, setuserui] = useState([""]);
  function handelsubmit(e) {
    e.preventDefault();
    const result = JSON.parse(localStorage.getItem("user")) ||[];
    if (result.length === 0) {
      alert("Please Signup in Your Account")
      navigate("/Signup");
      return;
    }
    const matchuser = result.find(
      (u) => u.email === form.email && u.password === form.password);
    if (matchuser){
      alert("succfully login");
      localStorage.setItem("token", "true");
      localStorage.setItem("currentuser", JSON.stringify(matchuser));
      setuserui([matchuser]);
      navigate("/");
    }
    else if (result.email !== form.email && result.password === form.password) {
      alert("not equl your email:");
    } else  if (
      result.email === form.email &&
      result.password !== form.password
    ) {
      alert("not equl to your pass:");
    } 
    else {
      alert("enter the name & pass:")
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
        <input
          type="email"
          placeholder="enter the enail"
          value={form.email}
          onChange={(e) => setform({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="enter the passs"
          value={form.password}
          onChange={(e) => setform({ ...form, password: e.target.value })}
        />

        <button type="submit">submit</button>
      </form>
      <div>
        {userui.map((x, index) => (
          <div key={index}>
            <p>{x.name}</p>
            <p>{x.last}</p>
            <p>{x.email}</p>
            <p>{x.password}</p>
            <p>{x.confirm}</p>
            <p>{x.age}</p>
            <p>{x.data}</p>
            <p>{x.address}</p>
            <p>{x.city}</p>
            <p>{x.number}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Login;
