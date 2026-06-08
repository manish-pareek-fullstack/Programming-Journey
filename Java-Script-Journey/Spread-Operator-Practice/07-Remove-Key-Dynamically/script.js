const user = {
  id: 1,
  name: "Prajjal",
  role: "Admin",
  active: false
};

const keyToRemove = "role";

// 👉 Remove key dynamically using destructuring +
let { [keyToRemove]: remove, ...newuser } = user;
console.log(newuser);