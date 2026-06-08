const user = {
  id: 1,
  profile: {
    name: "Prajjal",
    city: "Jaipur"
  }
};

// 👉 Update city to "Kolkata" immutably using spread.
let updateuser = {
  ...user,
  profile: { ...user.profile,city:"kolkata"},
}
console.log(updateuser);
