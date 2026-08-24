// Question 56
const nextGreater = arr => arr.map((x,i)=>arr.slice(i+1).find(y=>y>x) ?? -1);