// Question 30
const longestWord = s => s.match(/\w+/g).reduce((a,b)=>b.length>a.length?b:a,'');