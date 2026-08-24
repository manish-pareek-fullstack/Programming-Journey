// Question 57
const nearestSmaller = arr => arr.map((x,i)=>arr.slice(0,i).reverse().find(y=>y<x) ?? -1);