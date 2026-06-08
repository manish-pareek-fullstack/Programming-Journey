let btn1_incr = document.getElementById("btn1_incr");
let btn1_dec = document.getElementById("btn1_dec");
let data1 = parseInt(document.getElementById("data1").innerText);
let text_incr = document.getElementById("text_incr");
let text_dec = document.getElementById("text_dec");
let text_reset = document.getElementById("text_reset");
function Counter(count) {
  let min = 0;
  let max = 20;
  return {
    increment(id) {
      if (count < max) {
        count++;
        document.getElementById(id).innerText = count;
      }
    },
    decrement(id) {
      if (count > min) {
        count--;
        document.getElementById(id).innerText = count;
      }
    },
    reset(id) {
      count = 0;
      document.getElementById(id).innerText = count;
    },
  };
}
let res1 = Counter(data1);
function toggleIncrement() {
  text_incr.classList.add("text-blue-500");
  text_dec.classList.remove("text-blue-500");
}
function toggleDecrement() {
  text_dec.classList.add("text-blue-500");
  text_incr.classList.remove("text-blue-500");
}
btn1_incr.addEventListener("click", () => {
  toggleIncrement();
  res1.increment("data1");
});
btn1_dec.addEventListener("click", () => {
  toggleDecrement();
  res1.decrement("data1");
});
text_reset.addEventListener("click", () => {
  res1.reset("data1");
  text_reset.classList.remove("text-yellow-500");
  text_reset.classList.add("text-white");
});
