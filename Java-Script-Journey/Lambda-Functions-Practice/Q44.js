// Question 44
const palindromeSubCount = s => allSubstrings(s).filter(x=>x===reverseStr(x)).length;