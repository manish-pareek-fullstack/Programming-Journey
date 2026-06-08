// Question 40
const longestWordLen = s => {const w=s.split(' ').reduce((a,b)=>b.length>a.length?b:a,''); return {word:w,length:w.length};};