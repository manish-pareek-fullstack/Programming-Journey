import React from "react";
import "./Home.css";

const Home = ({obj}) => {
  return (
    <section className="hero">
      <div className="hero-text">
        <h3>Hello</h3>

        <h1>{obj.name}</h1>

        <h2 className="typing">{ obj.pos}</h2>

        <p>
          Full Stack Web Developer (MERN) and DSA enthusiast. Currently working
          as a Web Developer Intern at Regex Software and building modern web
          applications using React, Node.js and MongoDB.
        </p>


        <div className="social">
          <a
            target="blank"
            href="https://www.linkedin.com/in/manish-pareek-fullstack"
          >
            LinkedIn
          </a>
          <a target="blank" href="https://github.com/manish-pareek-fullstack">
            GitHub
          </a>
          <a href="mailto:manishpareek.3334@gmail.com">Email</a>
        </div>
      </div>
    </section>
  );
};

export default Home;
