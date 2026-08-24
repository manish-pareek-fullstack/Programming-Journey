const freeCourses = ["HTML", "CSS"];
const premiumCourses = ["React", "Node"];
const isPremiumUser = true;

👉 If premium user, combine both arrays using spread.
 Else return only freeCourses.

let updatedata = isPremiumUser
  ? [...freeCourses, ...premiumCourses]
  : [...freeCourses];

console.log(freeCourses);
console.log(updatedata);