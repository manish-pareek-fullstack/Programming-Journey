import { useState } from "react";

const UseCouter = (value = 0) => {
  const [count, setcount] = useState(value);

  const increment = () => {
    setcount(count + 1);
  };

  const decrement = () => {
    setcount(count - 1);
  };

  const multiply = () => {
    setcount(count * 2);
  };

  const divide = () => {
    setcount(count / 2);
  };

  return [count, increment, decrement, divide, multiply];
};

export default UseCouter;
