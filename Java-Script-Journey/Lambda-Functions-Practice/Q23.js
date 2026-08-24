// 23. Write a lambda function that takes a string and parse it into float upto two decimal places.

let parseFloatTwo = s => Number(parseFloat(s).toFixed(2));
console.log(parseFloatTwo("3.14159"));

