const http = require("http");
const express = require("express");
// const { mno, xyz } = require("./abc");
const { time, interver } = require("./Ab");
const fs = require("fs");
// const { createDiffieHellmanGroup } = require("crypto");
// const { timeEnd } = require("console");
const path = require("path");
const port = 2000;
let app = express();

// fs.writeFileSync("file", "hellow node  ");
// fs.writeFile("file.txt", "error handing", (err) => {
//   console.log(err);
// });
// fs.rename("file.txt", "newfile.txt", (err) => {
//   if (err) {
//     return err;
//   }
// });
// fs.rm("newfile.txt", { recursive: true, force: true }, (err) => {
//   if (err) {
//     console.error(err);
//     return err;
//   }
//   console.log("File deleted successfully!");
// });
// console.time("start");
// console.time(timeEnd);
// const files = fs.readFileSync("file", "utf8");
// const file = fs.readFile("file.txt", "utf8", (err, data) => {
//   console.log(err);
//   console.log("readefile", data);
// });
// fs.appendFileSync("file", "appendfile");
// const fileappend = fs.appendFile("file.txt", "utf8", (err) => {
//   return {
//     err,
//   };
// });
// fs.unlinkSync("file");
// fs.unlinkSync("file.txt");
// const server = http.createServer((req, res) => {
//   res.writeHead(200);
//   if (req.url === "/") {
//     if (req.method === "GET") {
//       res.write("<h1>Get</h1>");
//       res.end();
//     }
//   } else if (req.url === "/about") {
//     if (req.method === "GET") {
//       res.write("<h1>About Page</h1>");
//       res.end();
//     }
//   }
// });

const students = [
  {
    id: 1,
    personal: {
      name: "Rahul Sharma",
      age: 21,
      gender: "Male",
    },
    course: {
      name: "BCA",
      duration: "3 Years",
      semester: 5,
    },
    marks: {
      math: 85,
      computer: 90,
      english: 78,
    },
    address: {
      city: "Delhi",
      state: "Delhi",
    },
    skills: ["HTML", "CSS", "JavaScript"],
    isPassed: true,
  },
  {
    id: 2,
    personal: {
      name: "Neha Verma",
      age: 22,
      gender: "Female",
    },
    course: {
      name: "MCA",
      duration: "2 Years",
      semester: 3,
    },
    marks: {
      math: 92,
      computer: 95,
      english: 88,
    },
    address: {
      city: "Chandigarh",
      state: "Punjab",
    },
    skills: ["React", "Node.js", "MongoDB"],
    isPassed: true,
  },
  {
    id: 3,
    personal: {
      name: "Amit Kumar",
      age: 20,
      gender: "Male",
    },
    course: {
      name: "BTech",
      duration: "4 Years",
      semester: 6,
    },
    marks: {
      math: 70,
      computer: 75,
      english: 65,
    },
    address: {
      city: "Panipat",
      state: "Haryana",
    },
    skills: ["C++", "Java", "DSA"],
    isPassed: true,
  },
  {
    id: 4,
    personal: {
      name: "Priya Singh",
      age: 23,
      gender: "Female",
    },
    course: {
      name: "MBA",
      duration: "2 Years",
      semester: 2,
    },
    marks: {
      math: 60,
      computer: 65,
      english: 70,
    },
    address: {
      city: "Lucknow",
      state: "UP",
    },
    skills: ["Management", "Excel", "Communication"],
    isPassed: false,
  },
  {
    id: 5,
    personal: {
      name: "Rohit Yadav",
      age: 21,
      gender: "Male",
    },
    course: {
      name: "BSc",
      duration: "3 Years",
      semester: 4,
    },
    marks: {
      math: 88,
      computer: 82,
      english: 80,
    },
    address: {
      city: "Jaipur",
      state: "Rajasthan",
    },
    skills: ["Python", "Data Analysis", "SQL"],
    isPassed: true,
  },
];
app.use(express.json());

app.get("/data", (req, res) => {
  let name = req.query.name;
  let result = students.find((val) => val.personal.name === name);
  res.send(students);
 
});
app.post("/data", (req, res) => {
 console.log(req.body)
})
app.listen(port, () => {
  console.log()
})
