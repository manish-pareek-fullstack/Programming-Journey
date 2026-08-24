import React from 'react'
import "./Skill.css";
const Skill = ({ obj }) => {
  return (
    <section className="skill">
      <div className="skill-container">
        <h1>My Skills</h1>

        <div className="skill-box">
          <div className="skill-card">
            <h3>Frontend</h3>
            <p>
              {obj.Skill.Frontend.map((x, index) => (
                <span key={index}>{x}{" "}</span>
              ))}
            </p>
          </div>

          <div className="skill-card">
            <h3>Backend</h3>
            <p> {obj.Skill.backend}</p>
          </div>

          <div className="skill-card">
            <h3>Database</h3>
            <p>{obj.Skill.database}</p>
          </div>

          <div className="skill-card">
            <h3>Programming</h3>
            <p>
              {obj.Skill.Programming.map((x, index) => (
                <span key={index}>{x} </span>
              ))}
            </p>
          </div>

          <div className="skill-card">
            <h3>Tools</h3>
            <p>{obj.Skill.Tools.map((x, index) => (<span key={index}>{x}{" "}</span>))}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skill
