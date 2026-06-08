function counter() {
  let count = 0;
  return function () {
    ++count;
    return (document.innerText = count);
  };
}
function printname(name) {
  document.innerText = name;
  return name;
}
let followBtnhtml = document.getElementById("followBtn");
let username = printname("Manish Pareek");
let res = counter();
followBtnhtml.addEventListener("click", () => {
  let totalcount = res();
  let res2 = username;
  alert(`${username} followed ${totalcount} times`);
});
