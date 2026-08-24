import axios from "axios";
import React, { useEffect, useEffectEvent, useState } from "react";
import { Link } from "react-router-dom";

const Event = () => {
  const [toggel, settoggel] = useState(true);
  const [contry, setcontry] = useState("");
  const [state, setstate] = useState("");
  const [dis, setdis] = useState("");
  const [api, setapi] = useState([]);
  const [count, setcoute] = useState(0);

  const data = {
    India: {
      Rajasthan: ["Jaipur", "Udaipur", "Kota"],
      Gujarat: ["Ahmedabad", "Surat", "Vadodara"],
      Maharashtra: ["Mumbai", "Pune", "Nagpur"],
    },

    USA: {
      California: ["Los Angeles", "San Diego", "San Francisco"],
      Texas: ["Houston", "Dallas", "Austin"],
      Florida: ["Miami", "Orlando", "Tampa"],
    },

    Canada: {
      Ontario: ["Toronto", "Ottawa", "Hamilton"],
      Alberta: ["Calgary", "Edmonton", "Red Deer"],
    },
  };
  console.log("state", dis);
  console.log("toggel", toggel);
  const fatchdata = useEffectEvent(() => {
    try {
      const res = axios
        .get("https://fakestoreapi.com/products")
        .then((res) => res.data);
      (console.log("--->res"), res);
    } catch (error) {
      console.log(error);
    }
  });

  console.log("10");

  function handel() {
    settoggel(!toggel);
  }
  function increment() {
    setcoute(count+1)
  }
  function decrement() {
    setcoute(count-1)
  }
  console.log('counter',count)
  // const fatch = async () => {
  //   const ans = await axios.get('');

  // }
  // react reacletion difialgoridam
  console.log("api", api);
  useEffect(() => {
   fetch("https://dummyjson.com/products")
     .then((ans) => ans.json())
     .then((result) => setapi(result.products));
  }, [count]);
  console.log('apidata',api)
 
  return (
    <div> 
      <p>counter</p>
      <button onClick={increment} >+</button>
      <button onClick={decrement}>-</button>
      <br />
      <button onClick={handel}>btn</button>
      <form action="">
        <label htmlFor="">
          select the contry
          <select value={contry} onChange={(e) => setcontry(e.target.value)}>
            <option>select the contry</option>
            {Object.keys(data).map((c) => (
              <option>{c}</option>
            ))}
          </select>
        </label>
        <label htmlFor="">
          select the state
          <select
            disabled={!contry}
            value={state}
            onChange={(e) => setstate(e.target.value)}
          >
            <option>select the contry</option>
            {contry &&
              Object.keys(data[contry]).map((c) => <option>{c}</option>)}
          </select>
        </label>
        <label htmlFor="">
          select the dis
          <select
            disabled={!state}
            value={dis}
            onChange={(e) => setdis(e.target.value)}
          >
            <option>select the dis</option>
            {contry &&
              state &&
              data[contry][state].map((c) => <option>{c}</option>)}
          </select>
        </label>
      </form>
      {api.map((i) => (
        <div>
          <table>
            <tr>
              <td>
                <p>{i.id}</p>
              </td>
              <td>
                {" "}
                <p>{i.title}</p>
              </td>
              <td>
                {" "}
                <p>{i.description}</p>
              </td>
              <td>
                {" "}
                <p>{i.category}</p>
              </td>
            </tr>
            <tr>
              <td>
                {" "}
                <p>{i.price}</p>
              </td>
              <td>
                {" "}
                <p>{i.discountPercentage}</p>
              </td>
              <td>
                {" "}
                <p>{i.rating}</p>
              </td>
              <td>
                <img src={i.images} alt="" width={100} />
              </td>
            </tr>
          </table>
        </div>
      ))}
    </div>
  );
};

export default Event;
