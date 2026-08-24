const time = setTimeout(() => {
  console.log("settimeout");
}, 2000);
const number = 120;
const interver = setInterval(() => {
  console.log("setinterver");
}, 2000);
if (number > 20) {
clearInterval(interver)
}

module.exports = {
  time,
  interver,
};
 
