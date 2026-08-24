// Question 49
const pairWithSum = (arr,t)=>arr.flatMap((x,i)=>arr.slice(i+1).filter(y=>x+y===t).map(y=>[x,y]));