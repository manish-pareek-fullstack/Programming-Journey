const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());
mongoose
  .connect("mongodb://localhost:27017/studentDashboard")
  .then(() => {
    console.log("mongoose connect");
  })
  .catch((error) => {
    console.log(error);
  });
const studentschema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  age: Number,
  gender: String,
});
const user = mongoose.model("user", studentschema);
app.post("/users", async (req, res) => {
  const result = await user.create(req.body);
  res.send({
    statas: "data resive in backend",
  });
});
app.get("/users", async (req, res) => {
  try {
    const data = await user.find();

    res.send(data);
  } catch (error) {
    res.send({
      status: "error",
      message: error.message,
    });
  }
});
app.patch("/users/:id", async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  console.log(data);
  try {
    await user.updateOne({ _id: id }, { $set: data });
    res.send(data);
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
});
app.delete("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const result = await user.deleteOne({ _id: id });

    res.status(200).send({
      status: "success",
      message: "Student deleted successfully",
      result,
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
});
app.listen(port, () => {
  console.log(`server is runging ${port}`);
});
