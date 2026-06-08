// Question 45
const majorityElement = arr => arr.find(x=>arr.filter(y=>y===x).length>arr.length/2);