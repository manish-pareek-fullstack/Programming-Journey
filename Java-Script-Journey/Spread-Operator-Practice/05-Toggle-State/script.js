const state = {
  isLoggedIn: false,
  theme: "dark"
};

// 👉 Return new state where isLoggedIn is toggled using spread operator.
let newstate = {
  ...state,
  isLoggedIn: !state.isLoggedIn,
  theme: state.theme === "dark" ? "light" : "dark",
};
console.log(newstate);
