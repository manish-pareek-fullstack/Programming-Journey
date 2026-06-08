// Question 43
const minUniqueSubLen = s => Math.min(...allSubstrings(s).filter(x=>new Set(x).size===new Set(s).size).map(x=>x.length));