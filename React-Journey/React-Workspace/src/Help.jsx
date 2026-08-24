import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
const Help = () => {
  const about = useSelector((state) => state.signup.aboutdata);
  console.log(about)
  return (
    <div>
      <h1>Test File</h1>
    </div>
  )
}

export default Help
