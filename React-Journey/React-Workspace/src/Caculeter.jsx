import React, { useState } from "react";
import { useEffect } from "react";
const Caculeter = () => {
  
  const [count, setcount] = useState(0);
  function updatevalue(newvalue) {
    if (newvalue > 50) {
      alert("Values ​​greater than 50 are not allowed. ");
    } else if (newvalue < 0) {
      alert("Values ​​greater than 0 are not allowed");
    } else {
      setcount(newvalue);
    }
  }
  function increment() {
    let value = count + 1;
    updatevalue(value);
  }
  function decriment() {
    let x = count - 1;
    updatevalue(x);
  }
  function maltiply() {
    let x = count * 2;
    updatevalue(x);
  }
  function divide() {
    let x = count / 2;
    x < 1 ? alert("Value too small") : updatevalue(x);
  }
  return (
    <div>
      <h1>count:{count}</h1>
      <button onClick={increment}>+</button>
      <button onClick={decriment}>-</button>
      <button onClick={maltiply}>*</button>
      <button onClick={divide}>/</button>
    </div>
  );
};

export default Caculeter;
