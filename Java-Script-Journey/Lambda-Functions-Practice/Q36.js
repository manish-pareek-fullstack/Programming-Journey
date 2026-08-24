// Question 36
const substrEndVowel = s => allSubstrings(s).filter(x=>/[aeiou]$/i.test(x));