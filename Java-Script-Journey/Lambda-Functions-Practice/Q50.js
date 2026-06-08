// Question 50
const sort012 = arr => [...Array(arr.filter(x=>x===0).length).fill(0),...Array(arr.filter(x=>x===1).length).fill(1),...Array(arr.filter(x=>x===2).length).fill(2)];