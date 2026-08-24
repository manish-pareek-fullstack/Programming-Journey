const express = require("express"); // first work in express import
const cors = require("cors"); // frontend and backend connect the cors in use
const mongoose = require("mongoose"); // mongoose in import
const app = express(); // express in use the app
const port = 8000;// port in store in variable
app.use(cors());//
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/student")// mongoose connect in node js
  .then(() => {
    console.log("mongoose connect");
  })
  .catch((error) => { // error handing
    console.log(error);
  });

const studentSchema = mongoose.Schema({ // document stacture
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});
const stud = mongoose.model("studen", studentSchema); // collection create
app.post("/student", async (req, res) => {
  try {
    const student = await stud.create(req.body);
    const data = await stud.find();
    res.json({
      status: "success fully data resive",
    });
  } catch (error) {
    console.log(error);
  }
});
app.listen(port, () => {
  console.log(`server is runging ${port}`);
});
