import React, { useState } from "react";
import { Link } from "react-router-dom";

const Deatel = () => {
  const [form, setform] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    age: "",
    gender: "",
    city: "",
    mobile: "",
    course: "",
    bio: "",
    terms: false,
  });

  const [error, seterror] = useState({});

  // input change
  const handelinput = (e) => {
    const { name, value, type, checked } = e.target;

    setform({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });

    // validation
    if (type === "checkbox") {
      if (!checked) {
        seterror({
          ...error,
          [name]: `${name} is required`,
        });
      } else {
        seterror({
          ...error,
          [name]: "",
        });
      }
    } else {
      if (value.trim() === "") {
        seterror({
          ...error,
          [name]: `${name} is required`,
        });
      } else {
        seterror({
          ...error,
          [name]: "",
        });
      }
    }
  };

  // submit
  function submit(e) {
    e.preventDefault();

    let obj = {};

    if (form.name === "") obj.name = "name is required";
    if (form.lastname === "") obj.lastname = "lastname is required";
    if (form.email === "") obj.email = "email is required";
    if (form.password === "") obj.password = "password is required";
    if (form.age === "") obj.age = "age is required";
    if (form.gender === "") obj.gender = "gender is required";
    if (form.city === "") obj.city = "city is required";
    if (form.mobile === "") obj.mobile = "mobile is required";
    if (form.course === "") obj.course = "course is required";
    if (form.bio === "") obj.bio = "bio is required";
    if (!form.terms) obj.terms = "accept checkbox";

    seterror(obj);

    if (Object.keys(obj).length === 0) {
      localStorage.setItem("signup", JSON.stringify(form));

      console.log(form);

      setform({
        name: "",
        lastname: "",
        email: "",
        password: "",
        age: "",
        gender: "",
        city: "",
        mobile: "",
        course: "",
        bio: "",
        terms: false,
      });
    }
  }

  return (
    <div>
      <form onSubmit={submit}>
        {/* name */}
        <input
          type="text"
          name="name"
          placeholder="name"
          value={form.name}
          onChange={handelinput}
        />
        <p style={{ color: "red" }}>{error.name}</p>

        {/* lastname */}
        <input
          type="text"
          name="lastname"
          placeholder="lastname"
          value={form.lastname}
          onChange={handelinput}
        />
        <p style={{ color: "red" }}>{error.lastname}</p>

        {/* email */}
        <input
          type="email"
          name="email"
          placeholder="email"
          value={form.email}
          onChange={handelinput}
        />
        <p style={{ color: "red" }}>{error.email}</p>

        {/* password */}
        <input
          type="password"
          name="password"
          placeholder="password"
          value={form.password}
          onChange={handelinput}
        />
        <p style={{ color: "red" }}>{error.password}</p>

        {/* age */}
        <input
          type="number"
          name="age"
          placeholder="age"
          value={form.age}
          onChange={handelinput}
        />
        <p style={{ color: "red" }}>{error.age}</p>

        {/* gender radio */}
        <div>
          <label>Gender :</label>
          <input
            type="radio"
            name="gender"
            value="male"
            checked={form.gender === "male"}
            onChange={handelinput}
          />
          Male
          <input
            type="radio"
            name="gender"
            value="female"
            checked={form.gender === "female"}
            onChange={handelinput}
          />
          Female
        </div>

        <p style={{ color: "red" }}>{error.gender}</p>

        {/* city select option */}
        <select name="city" value={form.city} onChange={handelinput}>
          <option value="">Select City</option>
          <option value="jaipur">Jaipur</option>
          <option value="delhi">Delhi</option>
          <option value="mumbai">Mumbai</option>
        </select>

        <p style={{ color: "red" }}>{error.city}</p>

        {/* mobile */}
        <input
          type="text"
          name="mobile"
          placeholder="mobile"
          value={form.mobile}
          onChange={handelinput}
        />
        <p style={{ color: "red" }}>{error.mobile}</p>

        {/* course */}
        <input
          type="text"
          name="course"
          placeholder="course"
          value={form.course}
          onChange={handelinput}
        />
        <p style={{ color: "red" }}>{error.course}</p>

        {/* textarea */}
        <textarea
          name="bio"
          placeholder="bio"
          value={form.bio}
          onChange={handelinput}
        ></textarea>

        <p style={{ color: "red" }}>{error.bio}</p>

        {/* checkbox */}
        <div>
          <input
            type="checkbox"
            name="terms"
            checked={form.terms}
            onChange={handelinput}
          />
          Accept Terms & Conditions
        </div>

        <p style={{ color: "red" }}>{error.terms}</p>

        <button type="submit">Submit</button>
      </form>

      <br />

      <Link to="/">Home</Link>
    </div>
  );
};

export default Deatel;



// import { useState } from "react";

// function Home() {
//   const [form, setForm] = useState({ name: "" });

//   function handleSubmit(e) {
//     e.preventDefault();

//     console.log("Submitted Data:", form);

//     setForm({ name: "" });
//   }

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="name"
//           placeholder="enter the name"
//           value={form.name}
//           onChange={(e) => setForm({ ...form, name: e.target.value })}
//         />

//         <button type="submit">add</button>
//       </form>

//       <h2>{form.name}</h2>
//     </div>
//   );
// }

// export default Home;

