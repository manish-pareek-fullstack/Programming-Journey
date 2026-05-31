import React from 'react'
const Child2 = ({ state, setstate }) => {
  function inc() {
    setstate(state + 1);
  }
  return <div><button onClick={inc}>click</button></div>;
};

export default Child2
