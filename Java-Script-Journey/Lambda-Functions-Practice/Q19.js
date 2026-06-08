// 19.Write a lambda function that checks if a year is a leap year.
 let isLeapYear=(year)=>(year%4===0 && year%100!==0) || (year%400===0);
 console.log(isLeapYear(2020));
 console.log(isLeapYear(2021));

