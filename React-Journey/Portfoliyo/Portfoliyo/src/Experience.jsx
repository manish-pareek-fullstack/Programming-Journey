import React from 'react'
import "./Experience.css";
const Experience = ({obj}) => {
  return (
    <section className="experience">
      <div className="exp-container">
        <h1>Experience</h1>

        <div className="exp-card">
          <h2>{obj.exp.expinfo}</h2>
          <h3>{obj.exp.location}</h3>

          <p className="duration">{obj.exp.duration}</p>

          <p>
           {obj.exp.work}
          </p>

          <ul>
            <li>Developing modern web applications using React.js.</li>
            <li>Building backend APIs using Node.js and Express.js.</li>
            <li>Working with MongoDB for database management.</li>
            <li>Practicing Data Structures & Algorithms using C++.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Experience
