const employee = {
  id: 101,
  name: "Rahul",
  role: "Developer"
};
const isPromoted = true;
// 👉 If promoted, add salary: 90000 using spread. Otherwise return unchanged object.
let updatedata = {
  ...employee,
  ...(isPromoted && { salary: 90000 } )
}
console.log(updatedata);
