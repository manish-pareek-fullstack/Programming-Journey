// Question 34
const substrKNoRepeat = (s,k)=>[...Array(s.length-k+1)].map((_,i)=>s.slice(+k)).filter(x=>new Set(x).size===k);