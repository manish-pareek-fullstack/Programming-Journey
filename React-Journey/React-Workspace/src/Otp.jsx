import React, { useEffect, useState } from "react";

const Otp = () => {
  const [form, setForm] = useState({
    first: "",
    second: "",
    third: "",
    fourth: "",
  });

  const [error, setError] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });

    // instant validation
    if (value.trim() === "") {
      setError({
        ...error,
        [name]: `${name} is required`,
      });
    }
    else {
      setError({
        ...error,
        [name]: "",
      });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    let obj = {};

    if (form.first.trim() === "") {
      obj.first = "first is required";
    }

    if (form.second.trim() === "") {
      obj.second = "second is required";
    }

    if (form.third.trim() === "") {
      obj.third = "third is required";
    }

    if (form.fourth.trim() === "") {
      obj.fourth = "fourth is required";
    }

    setError(obj);

    // no error
    if (Object.keys(obj).length === 0) {
      localStorage.setItem("signup", JSON.stringify(form));

      console.log("yes", form);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="enter number"
          name="first"
          maxLength="1"
          value={form.first}
          onChange={handleChange}
        />
        <p>{error.first}</p>

        <input
          type="text"
          placeholder="enter number"
          name="second"
          maxLength="1"
          value={form.second}
          onChange={handleChange}
        />
        <p>{error.second}</p>

        <input
          type="text"
          placeholder="enter number"
          name="third"
          maxLength="1"
          value={form.third}
          onChange={handleChange}
        />
        <p>{error.third}</p>

        <input
          type="text"
          placeholder="enter number"
          name="fourth"
          maxLength="1"
          value={form.fourth}
          onChange={handleChange}
        />
        <p>{error.fourth}</p>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Otp;
