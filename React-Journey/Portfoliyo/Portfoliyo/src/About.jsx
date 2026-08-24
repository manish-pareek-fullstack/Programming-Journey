import React from "react";
import "./About.css";
const About = ({ obj }) => {
  return (
    <section className="about">
      <div className="about-container">
        <h1>About Me</h1>

        <p className="about-color">
          {" "}
          {obj.about.info.map((x, index) => (
            <test key={index}>{x}</test>
          ))}
        </p>

        <div className="about-info">
          <div>
            <h3>Tech Stack</h3>
            {obj.about.aboutinfo}
          </div>

          <div>
            <h3>Interests</h3>
            <p> {obj.about.aboutInterests}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
