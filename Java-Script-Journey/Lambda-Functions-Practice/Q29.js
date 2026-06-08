// Question 29
const firstRepeatingChar = s => [...s].find((c,i)=>s.indexOf(c)!==i);