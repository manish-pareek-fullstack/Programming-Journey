import React, { useState } from "react";
import UseCouter from "./UseCouter";

const Counter = () => {
  const [theme, setTheme] = useState(false);
  const [count, increment, decrement, divide, multiply] = UseCouter(10);
  

  function handel() {
    if (!theme) {
      document.body.style.backgroundColor = "black";
      document.body.style.color = "white";
      setTheme(true);
    }
    else {
      document.body.style.backgroundColor = "white";
      document.body.style.color = "black";
      setTheme(false)
    }
  }

  return (
    <div>
      <h1>Counter: {count}</h1>

      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={multiply}>*</button>
      <button onClick={divide}>/</button>

      <div>helloo</div>
      <button onClick={handel}>drak mode</button>
    </div>
  );
};

export default Counter;
