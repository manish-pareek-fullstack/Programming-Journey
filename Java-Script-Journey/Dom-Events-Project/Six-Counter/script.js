let countdata = document.getElementById("countdata");
let countdata2 = document.getElementById("countdata2");
let countdata3 = document.getElementById("countdata3");
let countdata4 = document.getElementById("countdata4");
let countdata5 = document.getElementById("countdata5");
let countdata6 = document.getElementById("countdata6");
function counter() {
  let count = 0;
  return function () {
    count++;
    countdata.innerText = count;
  };
}
function counter2() {
  let count = 0;
  return function () {
    count++;
    countdata2.innerText = count;
  };
}
function counter3() {
  let count = 0;
  return function () {
    count++;
    countdata3.innerText = count;
  };
}
function counter4() {
  let count = 0;
  return function () {
    count++;
    countdata4.innerText = count;
  };
}
function counter5() {
  let count = 0;
  return function () {
    count++;
    countdata5.innerText = count;
  };
}
function counter6() {
  let count = 0;
  return function () {
    count++;
    countdata6.innerText = count;
  };
}
let res = counter();
let res2 = counter2();
let res3 = counter3();
let res4 = counter4();
let res5 = counter5();
let res6 = counter6();
let countbtn = document.getElementById("counterbtn");
let countbtn2 = document.getElementById("counterbtn2");
let countbtn3 = document.getElementById("counterbtn3");
let countbtn4 = document.getElementById("counterbtn4");
let countbtn5 = document.getElementById("counterbtn5");
let countbtn6 = document.getElementById("counterbtn6");
countbtn.addEventListener("click", res);
countbtn2.addEventListener("click", res2);
countbtn3.addEventListener("click", res3);
countbtn4.addEventListener("click", res4);
countbtn5.addEventListener("click", res5);
countbtn6.addEventListener("click", res6);
