// Question 64
const firstNonRepeatWord = s => {const w=s.split(' '); return w.find(x=>w.indexOf(x)===w.lastIndexOf(x));};