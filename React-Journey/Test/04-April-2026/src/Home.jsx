import React, { useState } from 'react'
import Child1 from './Child1'
const Home = () => {
  const [form, setform] = useState({
    email: "",
    password: "",
    
  })
  const [image, setimgae] = useState(null);
  const handelsubmit=(e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("email", "manishpareek@gmail.com");
    formdata.append("password", "manish123");
    formdata.append("image",image)
    fetch("http://localhost:3000/user", {
      method: "POST",
      // headers: {
      //   "Content-Type": "application/json",
      // },
      body:formdata
    });
    console.log(form)
}
  return (
    <div>
      <form onSubmit={handelsubmit}>
        <input
          type="email"
          placeholder="enter the email"
          onChange={(e) => setform({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setform({ ...form, password: e.target.value })}
        />
        <input type="file" placeholder='select the file' onChange={(e) => setimgae(e.target.files[0])}  />
        <input type="submit" placeholder="submit" />
      </form>
    </div>
  );
}

export default Home
