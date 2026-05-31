import React, { useState } from "react";
import { Link } from "react-router-dom";

const Abc = ({ formabc, formabcset }) => {
    console.log("formabcabc", formabc);
    const handelde = () => {
        formabcset({
            name: '',
            email: '',
            password: '',
            course: '',
            age:''
        })
        console.log('delete function chal raha  hai ')
   }
    
  return (
    <div>
      <button onClick={handelde}>delet</button>
    <button>edit</button>
          
      <p> name: {formabc.name}</p>
      <p>password: {formabc.password}</p>
      <p>course: {formabc.course}</p>
      <p>age: {formabc.age}</p>
      <p>email: {formabc.email}</p>
    </div>
  );
};

export default Abc;
