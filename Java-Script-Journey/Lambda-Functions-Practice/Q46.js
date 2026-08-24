// Question 46
const secondLargest = arr => arr.reduce(([f,s],n)=>n>f?[n,f]:(n>s&&n!==f)?[f,n]:[f,s],[-Infinity,-Infinity])[1];