// Question 41
const missing1toN = arr => (arr.length+1)*(arr.length+2)/2 - arr.reduce((a,b)=>a+b,0);