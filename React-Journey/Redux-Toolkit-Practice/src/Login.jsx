import React, { useState } from 'react'
import { Link } from 'react-router-dom'
const Login = () => {
  const [data, setdata] = useState({ email: '', password: '' });
  const [notification, setnotification] = useState({ email: '', password: '' });
  function handelsubmit(e) {
    e.preventDefault();

    const result = JSON.parse(localStorage.getItem('signup'));
    let obj = {};
    if (data.email === '') {
      obj.email = 'email is req:';
    }
    if (data.password === '') {
      obj.password = 'pass is req';
    }
    setnotification(obj);
    if (Object.keys(obj).length>0) {
      return
    }
    
    if (!result) {
      return alert('signup kro pahle');
    }
    if (result.email === data.email && result.password === data.password) {
      localStorage.setItem("login", JSON.stringify(data));
      alert("login succ");
    }
    else if (result.password === data.password && result.email !== data.email) {
      alert('not equl your email')
    }
    else if (result.password !== data.password && result.email === data.email) {
      alert("not equl your pass");
    } else {
      alert('invelid detail');
    }
   
    console.log('signupdata',result);
    
  }
  
  return (
    <div>
      <form onSubmit={handelsubmit}>
        <input type="email" placeholder='enter the email' value={data.email} onChange={(e) => setdata({ ...data, email: e.target.value })} />
     {notification.email}
        <input type="password" placeholder='enter the password' value={data.password} onChange={(e) => setdata({ ...data, password: e.target.value })} />
      {notification.password}
        <button type='submit'>submit</button>
      </form>
    </div>
  )
}

export default Login
