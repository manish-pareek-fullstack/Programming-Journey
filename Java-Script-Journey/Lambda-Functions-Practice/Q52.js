// Question 52
const maxVowelsK = (s,k)=>Math.max(...[...Array(s.length-k+1)].map((_,i)=>(s.slice(i,i+k).match(/[aeiou]/gi)||[]).length));