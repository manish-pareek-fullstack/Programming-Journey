// Question 42
const missingRange = arr => ((Math.max(...arr)+Math.min(...arr))*(arr.length+1)/2) - arr.reduce((a,b)=>a+b,0);