const express = require("express");
const cors = require("cors");
const multer = require("multer");

const app = express();
const upload = multer();

app.use(cors());
app.use(express.json());

const port = 3000;
let user1 = {
  id: 1,
  personal: {
    name: "Rahul Sharma",
    age: 21,
    gender: "Male",
  },
};
let students = [
  { id: 1, name: "Rahul", age: 21 },
  { id: 2, name: "Neha", age: 22 },
  { id: 3, name: "Amit", age: 20 },
];
app.post("/student", (req, res) => {
  res.send(students);
});
app.post("/user", upload.none(), (req, res) => {
  console.log(req.body);
  console.log(req.file);
  res.json({
    status: 200,
    message: "user log in",
  });
});
app.delete("/user", (req, res) => {
  user1 = null;
  res.send({
    message: "User deleted successfully",
    data: user1,
  });
});
app.listen(port, () => {
  console.log("server is run",port);
});
