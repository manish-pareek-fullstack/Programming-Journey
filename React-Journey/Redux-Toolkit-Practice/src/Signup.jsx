import React, { useState,useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
const Signup = () => {
  const navigate = useNavigate();
    const [form, setform] = useState({
      name:'',email:'',password:''
    })
    const [error, seterror] = useState({ name: '', email: '', password: '' });
   function handelsubmit(e){
      e.preventDefault();
      let obj = {};
      if (form.name === '') {
        obj.name='name is req:'
      }
      if (form.email === '') {
        obj.email='email is req'
      }
      if (form.password === '') {
        obj.password='pass id req'
      }
      seterror(obj);
      if(Object.keys(obj).length === 0) {
        localStorage.setItem("signup", JSON.stringify(form));
        alert("signup succ:")
        navigate('Login');
  }  
    }
    console.log('form',form)
    useEffect(() => {
    
     
    },[])
  return (
    <div>
      
      <form onSubmit={handelsubmit}>
        <input
          type="name"
          placeholder="enter the name"
          value={form.name}
          onChange={(e) => setform({ ...form, name: e.target.value })}
        />
        <p>{error.name}</p>
        <input
          type="email"
          placeholder="enter the email"
          value={form.email}
          onChange={(e) => setform({ ...form, email: e.target.value })}
        />
        <p>{error.email}</p>
        <input
          type="password"
          placeholder="enter the password"
          value={form.password}
          onChange={(e) => setform({ ...form, password: e.target.value })}
        />
        <p>{error.password}</p>
        <button type="submit">submit</button>
        <button onClick={()=>navigate('/Login')} >swich the login page </button>
      </form>
    </div>
  );
}

export default Signup
