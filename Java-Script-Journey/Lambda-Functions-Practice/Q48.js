// Question 48
const freqEach = arr => arr.reduce((o,n)=>(o[n]=(o[n]||0)+1,o),{});