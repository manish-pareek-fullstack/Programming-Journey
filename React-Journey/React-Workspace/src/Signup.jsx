import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
// import { adduser } from "./slice/slicesignup";
const Signup = () => {
  const dispatch = useDispatch();
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

  const [error, seterror] = useState([]);

  function handelsubmit(e) {
    e.preventDefault();
    let obj = {};

    if (form.name === "") {
      obj.name= "name is req";
    }

    if (form.email === "") {
      obj.email= "email is req:"
    }

    if (form.password === "") {
      obj.password= "pass is req:" 
    }

    if (form.gender === "") {
      obj.gender= "gender is req:";
    }

    if (form.skills.length === 0) {
      obj.skills= "select at least one skill";
    }

    seterror(obj);

   if (Object.keys(obj).length === 0) {
     const existingUsers = localStorage.setItem("user", JSON.stringify(form)) || [];
      const alreadyUser = existingUsers.find((u) => u.email === form.email);
      if (alreadyUser) {
        alert("User already exists ");
        return; //  yahi rok dega
      }
      // agar duplicate nahi hai to add karo
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

 const handleSkill = (e) => {
   const value = e.target.value;

   if (e.target.checked) {
     setform({ ...form, skills: [...form.skills, value] });
   } else {
     setform({
       ...form,
       skills: form.skills.filter((x) => x !== value),
     });
   }
 };
  return (
    <div>
    
      <form onSubmit={handelsubmit}>
        <input
          type="text"
          placeholder="enter the name"
          value={form.name}
          onChange={(e) => setform({ ...form, name: e.target.value })}
        />

        <div>
         {error.name}
        </div>
<br />
        <input
          type="email"
          placeholder="enter the email"
          value={form.email}
          onChange={(e) => setform({ ...form, email: e.target.value })}
        />

        <div>
        {error.email}
        </div>

        <input
          type="password"
          placeholder="enter the password"
          value={form.password}
          onChange={(e) => setform({ ...form, password: e.target.value })}
        />

        <div>
         {error.password}
        </div>

        <input
          type="password"
          placeholder="Confirm Password"
          value={form.confirm}
          onChange={(e) => setform({ ...form, confirm: e.target.value })}
        />

        <input
          type="number"
          placeholder="Enter Age"
          value={form.age}
          onChange={(e) => setform({ ...form, age: e.target.value })}
        />

        <input
          type="tel"
          placeholder="Enter Mobile Number"
          value={form.number}
          onChange={(e) => setform({ ...form, number: e.target.value })}
        />

        <input
          type="date"
          value={form.date}
          onChange={(e) => setform({ ...form, date: e.target.value })}
        />

        <input
          type="text"
          placeholder="Enter Address"
          value={form.address}
          onChange={(e) => setform({ ...form, address: e.target.value })}
        />

        <input
          type="text"
          placeholder="Enter City"
          value={form.city}
          onChange={(e) => setform({ ...form, city: e.target.value })}
        />

        <h3>Select Gender</h3>

        <label>
          <input type="radio" value="Male" checked={form.gender==="Male"} onChange={(e)=>setform({...form,gender:e.target.value})} />
        </label>
        {/* male */}
        <label>
          <input
            type="radio"
            value="Male"
            checked={form.gender === "Male"}
            onChange={(e) => setform({ ...form, gender: e.target.value })}
          />
          Male
        </label>

        <label>
          <input
            type="radio"
            value="Female"
            checked={form.gender === "Female"}
            onChange={(e) => setform({ ...form, gender: e.target.value })}
          />
          Female
        </label>

        <label>
          <input
            type="radio"
            value="Other"
            checked={form.gender === "Other"}
            onChange={(e) => setform({ ...form, gender: e.target.value })}
          />
          Other
        </label>

        <div>
         
        </div>

        <h3>Select Skills</h3>

        <label>
          <input
            type="checkbox"
            value="HTML"
            checked={form.skills.includes("HTML")}
            onChange={handleSkill}
          />
          HTML
        </label>

        <label>
          <input
            type="checkbox"
            value="CSS"
            checked={form.skills.includes("CSS")}
            onChange={handleSkill}
          />
          CSS
        </label>

        <label>
          <input
            type="checkbox"
            value="React"
            checked={form.skills.includes("React")}
            onChange={handleSkill}
          />
          React
        </label>

        <div>
         
        </div>

        <br />

        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default Signup;
