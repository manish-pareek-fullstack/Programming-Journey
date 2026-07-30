const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let array = [
  { id: 1, name: "Shivraj", email: "shiv@gmail.com", password: "12345" },
  { id: 2, name: "Rahul", email: "rahul@gmail.com", password: "12345" },
  { id: 3, name: "Aman", email: "aman@gmail.com", password: "12345" },
];

// GET
app.get("/form", (req, res) => {
  res.json({ array });
});

// POST
app.post("/form", (req, res) => {
  const newUser = {
    id: array.length + 1,
    ...req.body,
  };
  array.push(newUser);

  res.json({ array });
});

// DELETE
app.delete("/form/:id", (req, res) => {
  const id = Number(req.params.id);
  array = array.filter((u) => u.id !== id);

  res.json({ array });
});

// PUT
app.put("/form/:id", (req, res) => {
  const id = Number(req.params.id);

  const index = array.findIndex((u) => u.id === id);

  if (index !== -1) {
    array[index] = { id, ...req.body };
  }

  res.json({ array });
});

// PATCH
app.patch("/form/:id", (req, res) => {
  const id = Number(req.params.id);

  const user = array.find((u) => u.id === id);

  if (user) {
    Object.assign(user, req.body);
  }

  res.json({ array });
});

app.listen(5000, () => {
  console.log("Server running on 5000");
});
