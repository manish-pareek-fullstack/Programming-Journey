// Question 35
const allSubstrings = s => [...s].flatMap((_,i)=>[...s].map((_,j)=>s.slice(i,i+j+1)).filter(x=>x));