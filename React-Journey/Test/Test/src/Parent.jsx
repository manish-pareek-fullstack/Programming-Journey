import React, { useState } from 'react'
import Child1 from './Child1';
import Child2 from './Child2';
const Parent = () => {
    const [state, setstate] = useState(0);
  return (
    <div>
      <Child1 state={state} />
      <Child2 setstate={setstate} state={state} />
    </div>
  );
}

export default Parent
