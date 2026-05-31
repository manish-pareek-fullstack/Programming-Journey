import React, { useState } from 'react'
import Childapi from './Childapi';


const ParentApi = ({ data }) => {
  const [apidata, setdata] = useState([]);
    const [merge, setmerge] = useState([]);
    const [toggel, settoggel] = useState(false);

  function handel(val) {
    console.log(val);
      setdata(val);
      setmerge(val);
  }

  function handelbtn() {
      if (!toggel) {
          const finaldata = [...apidata, ...data];
          setmerge(finaldata);
         
      }
      else {
          setmerge([...apidata]);
      }
       settoggel(!toggel);
    }
   

  return (
    <div>
      <button onClick={handelbtn}>merge in data</button>

      <Childapi sendchilddata={handel} />

      <h2>Parent Data</h2>

      {merge.map((x) => (
        <div key={x.id}>
          <h2> {x.id}</h2>
          <div>
            <img src={x.image} alt="" width={100} />
          </div>

          {x.title}
          <div>{x.price}</div>
          <div>{x.description}</div>
          <div>{x.category}</div>

          {x.rating?.rate}
          <div>{x.rating?.count}</div>
        </div>
      ))}
    </div>
  );
};

export default ParentApi;