// Question 54
const longest01 = arr => Math.max(...arr.map((_,i)=>arr.slice(i).findIndex((_,j)=>arr.slice(i,i+j+1).filter(x=>x===0).length===arr.slice(i,i+j+1).filter(x=>x===1).length)+1));