const doctorBasic = {
  name: "Dr. Sharma",
  specialization: "Cardiology"
};
const doctorExtra = {
  experience: 12,
  rating: 4.8
};
// 👉 Merge both objects using spread operator.
let updatedata = {
  ...doctorBasic,
  ...doctorExtra
}
console.log(updatedata);
