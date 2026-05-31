import React from 'react'
import "./Qualification.css";
const Qualification = ({obj}) => {
  return (
    <section className="qualification">
      <div className="qualification-container">
        <h1>Qualification</h1>

        <div className="qualification-card">
          <h3>Bachelor of Arts</h3>
          <p>{obj.Qualification.BachelorofArts}</p>
          <span>{obj.Qualification.BachelorofArtsduration}</span>
        </div>

        <div className="qualification-card">
          <h3>Senior Secondary (Arts)</h3>
          <p>{obj.Qualification.class10th}</p>
          <span>{obj.Qualification.class10thduration}</span>
        </div>

        <div className="qualification-card">
          <h3>High School</h3>
          <p>{obj.Qualification.Highschool}</p>
        </div>
      </div>
    </section>
  );
}

export default Qualification
