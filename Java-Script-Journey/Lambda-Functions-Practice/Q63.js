// Question 63
const firstNonRepeatChar = s => [...s].find(c=>s.indexOf(c)===s.lastIndexOf(c));