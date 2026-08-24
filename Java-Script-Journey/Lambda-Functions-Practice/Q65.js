// Question 65
const firstNonRepeatCharStep = s => [...s].map((_,i)=>[...s.slice(0,i+1)].find(c=>s.slice(0,i+1).indexOf(c)===s.slice(0,i+1).lastIndexOf(c))||-1);