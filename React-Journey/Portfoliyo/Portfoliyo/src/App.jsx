import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./About";
import Home from "./Home";
import Skill from "./Skill";
import Header from "./Header";
import Contact from "./Contact";
import Experience from "./Experience";
import Project from "./Project";
import Qualification from "./Qualification";
import Goal from "./Goal";
import Error from "./Error";
function App() {
  const obj = {
    name: "I'm Manish Pareek",
    pos: "Full Stack Web Developer",
    detail:
      " Full Stack Web Developer (MERN) and DSA enthusiast. Current working as a Web Developer Intern at Regex Software and building modern webapplications using React, Node.js and MongoDB.",
    about: {
      info: [
        "Hi, I'm Manish Pareek, a passionate Full Stack Web Developer (MERN Stack) and a Data Structures & Algorithms enthusiast.I am currently pursuing a Bachelor of Arts degree from Pandit Deendayal Upadhyay University, Sikar.",

        "  Currently, I am working as a Web Developer Intern at RegexSoftware, Jaipur, where I build modern web applications using React, Node.js,Express.js and MongoDB.",

        " Along with development, I actively practice Data Structures andAlgorithms using C++ and solve problems regularly on LeetCode to improve my problem-solving skills.",
      ],

      aboutinfo: "React • Node.js • Express • MongoDB • JavaScript • C++",
      aboutInterests:
        "Web Development • Problem Solving • Software Engineering",
    },
    Skill: {
      Frontend: [
        "HTML",
        "• CSS ",
        "• JavaScript",
        " • React ",
        "• Tailwind CSS",
      ],
      backend: "Node.js • Express.js",
      database: "MongoDB",
      Programming: ["C++ ", "• C ", "• Problem Solving"],
      Tools: ["Git ", "• GitHub ", "• VS Code"],
    },
    exp: {
      expinfo: "Web Developer Intern",
      location: "Regex Software Services, Jaipur",
      duration: "July 2025 – March 2026",
      work: "Working as a Full Stack Web Developer Intern where I build web applications using the MERN Stack.",
    },
    My_Goal: {
      goaldeateil: [
        "My goal is to become a skilled Software Developer and build scalable web applications using modern technologies.",
        "I want to continuously improve my programming and problem solving  skills by practicing Data Structures and Algorithms and building real world projects.",
        "I aim to work in a strong development team where I can learn, grow and contribute to impactful software products.",
      ],
    },
    Contact: {
      Contactinfo:
        "If you want to collaborate, discuss a project, or have any opportunities, feel free to contact me.",
      email: "manishpareek.3334@gmail.com",
      linkdin: " linkedin.com/in/manish-pareek-fullstack",
      GitHub: " github.com/manish-pareek-fullstack",
      leedcode: " leetcode.com/u/ManishPareek",
    },
    Project: {
      TaskManager:
        " A simple task management application built using JavaScript and Tailwind CSS to manage daily tasks.",
      Developerortfolio:
        "Personal portfolio website built using React to showcase projects, skills and experience.",
      LeetCodePractice:
        "Regularly solving Data Structures and Algorithms problems using C++ to improve problem solving skills.",
    },
    Qualification: {
      BachelorofArts: "Pandit Deendayal Upadhyay University, Sikar",
      BachelorofArtsduration: "2024 – 2027",
      class10th: "Board of Secondary Education Rajasthan",
      class10thduration: "2023 – 2024",
      Highschool: "Board of Secondary Education Rajasthan",
    },
  };

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home obj={obj} />}></Route>
        <Route path="/Skill" element={<Skill obj={obj} />}></Route>
        <Route path="/About" element={<About obj={obj} />}></Route>
        <Route path="/Experience" element={<Experience obj={obj} />}></Route>
        <Route path="/Goal" element={<Goal obj={obj} />}></Route>
        <Route path="/Contact" element={<Contact obj={obj} />}></Route>
        <Route path="/Project" element={<Project obj={obj} />}></Route>
        <Route path="*" element={<Error/>}></Route>
        <Route
          path="/Qualification"
          element={<Qualification obj={obj} />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
