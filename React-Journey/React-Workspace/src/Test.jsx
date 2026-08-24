import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Test = () => {
  const [contry, setcontry] = useState("");
  const [state, setstate] = useState("");
  const [dist, setdist] = useState("");
  const [count, setcount] = useState(10);
  const [toggel, settoggel] = useState(false);
  const [value, setvalue] = useState(0);

  const meme = () => {
    console.log('rending');
    setvalue(count*count  )
console.log(toggel);
  }
 console.log('toggel',toggel)
  useMemo(() => {
    meme()
  }, [count,toggel]);

  const togglehandel = () => {
    settoggel(!toggel);
  }
  const obj = {
    india: {
      states: {
        Maharashtra: ["Mumbai", "Pune", "Nagpur"],
        Karnataka: ["Bengaluru", "Mysuru", "Mangalore"],
        TamilNadu: ["Chennai", "Coimbatore", "Madurai"],
        Gujarat: ["Ahmedabad", "Surat", "Vadodara"],
        Rajasthan: ["Jaipur", "Udaipur", "Jodhpur"],
        WestBengal: ["Kolkata", "Siliguri", "Durgapur"],
        Punjab: ["Chandigarh", "Amritsar", "Ludhiana"],
        Haryana: ["Gurugram", "Faridabad", "Panipat"],
        Telangana: ["Hyderabad", "Warangal", "Nizamabad"],
        UttarPradesh: ["Lucknow", "Kanpur", "Agra"],
        Bihar: ["Patna", "Gaya", "Bhagalpur"],
        Odisha: ["Bhubaneswar", "Cuttack", "Rourkela"],
      },
    },
    usa: {
      states: {
        California: ["Los Angeles", "San Francisco", "San Diego"],
        NewYork: ["New York City", "Buffalo", "Rochester"],
      },
    },
    germany: {
      states: {
        Bavaria: ["Munich", "Nuremberg", "Augsburg"],
        Berlin: ["Berlin", "Potsdam", "Cottbus"],
      },
    },
  };

  return (
    <div>
      <div>
        <button onClick={() => setcount(count + 1)}>+</button>
        {count} <h1>{value}</h1>
        <button onClick={togglehandel}>click</button>
        {toggel}
      </div>
   
      <label>
        select the contry
        <select value={contry} onChange={(e) => setcontry(e.target.value)}>
          <option value="">select the opt</option>
          {Object.keys(obj).map((x, index) => (
            <option key={index} value={x}>
              {x}
            </option>
          ))}
        </select>
      </label>
      <label>
        {" "}
        select the state
        <select value={state} onChange={(e) => setstate(e.target.value)}>
          <option value="">select thr opt</option>
          {contry &&
            Object.keys(obj[contry].states || {}).map((x, index) => (
              <option key={index} value={x}>
                {x}
              </option>
            ))}
        </select>
      </label>
      <label>
        select the dis:
        <select onChange={(e) => setdist(e.target.value)} value={dist}>
          <option value="">select the opt</option>
          {contry &&
            state &&
            obj[contry].states[state].map((x, index) => (
              <option key={index}>{x}</option>
            ))}
        </select>
      </label>
    </div>
  );
};

export default Test;
