import React from 'react'
import "./Project.css";
const Project = ({obj}) => {
  return (
    <section className="project">
      <div className="project-container">
        <h1>Projects</h1>

        <div className="project-box">
          <div className="project-card">
            <h3>Task Manager App</h3>
            <p>{obj.Project.TaskManager}</p>
          </div>

          <div className="project-card">
            <h3>Developer Portfolio</h3>
            <p>{obj.Project.Developerortfolio}</p>
          </div>

          <div className="project-card">
            <h3>LeetCode Practice</h3>
            <p>{obj.Project.LeetCodePractice}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Project
