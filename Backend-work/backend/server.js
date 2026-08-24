require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
// const multer = require("multer")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./userAuth");

let port = process.env.PORT;
let secretKey = process.env.SecretKey;

app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb://localhost:27017/newproject")
  .then((res) => console.log("mongodb connected"))
  .catch((err) => console.log(err));

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});
const Student = mongoose.model("Student", studentSchema);

app.post("/user/create", async (req, res) => {
  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const savedUser = await Student.create({
    name,
    email,
    password: hashedPassword,
  });

  res.send({ status: true, message: "user create successfully" });
});

app.post("/user/login", async (req, res) => {
  const { email, password } = req.body;
  let user = await Student.findOne({ email });
  if (!user) {
    res.send({ message: "email not found", status: false });
    return;
  }
  let result = await bcrypt.compare(password, user.password);
  if (!result) {
    res.send({ message: "Incorrect password ", status: false });
  }

  let token = await jwt.sign(user.email, secretKey);

  res.send({ status: true, message: "User fetch successfully", user, token });
});

app.put("/user/update", userAuth, async (req, res) => {
  console.log("controller");

  const { name, email } = req.body;
  const updateUser = await Student.updateOne({ email }, { $set: { name } });
  res.send({
    status: true,
    message: "User updated successfully",
    user: updateUser,
  });
});

app.listen(port, () => {
  console.log("server running on port:", port);
});
