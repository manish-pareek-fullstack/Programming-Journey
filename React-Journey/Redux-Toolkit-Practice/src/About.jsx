import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
const About = () => {
   const apihome = useSelector((state) => state);
  console.log('apihome',apihome)
  return (
    <div>
      ABOUT
    </div>
  )
}

export default About
