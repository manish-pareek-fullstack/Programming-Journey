// Question 38
const largestUniqueSub = s => allSubstrings(s).reduce((a,b)=>new Set(b).size===b.length && b.length>a.length?b:a,'');