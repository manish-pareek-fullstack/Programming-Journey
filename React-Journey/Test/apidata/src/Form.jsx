import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { upt } from "./app/SignupSlice";
const Form = () => {
  const [form, setform] = useState({
    name: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const formdata = useSelector((state) => state.userData);
  console.log('formlkdsjflkdsjl',formdata)
  const handelchange = (e) => {
    
    const { value, name } = e.target;
    setform({
      ...form,
      [name]: value
    })
  };
  const handelsubmit = (e) => {
    e.preventDefault();
    dispatch(upt(form))
  }
  return (
    <div>
      <form onSubmit={handelsubmit}>
        <input
          type="name"
          name="name"
          placeholder="enter the name"
          onChange={handelchange}
        />
        <input
          name="email"
          type="email"
          placeholder="enter the email"
          onChange={handelchange}
        />
        <input
          type="password"
          name="password"
          placeholder="enter the password"
          onChange={handelchange}
        />
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default Form;
