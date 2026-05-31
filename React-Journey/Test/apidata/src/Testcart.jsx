import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import TestHome from './TestHome';

const Testcart = ({ data }) => {
    const [datacard, setdata] = useState([]);
    function handel(val) {
        setdata(val);
        console.log(val);
    }
  return (
      <div>
          <TestHome send={handel} />
      link
    </div>
  )
}

export default Testcart
