// 22. Write a lambda function to check if two strings are equal by length and by letters.
let isEqual = (a, b) => a.length === b.length && a === b;
console.log(isEqual("abc", "abc"));
console.log(isEqual("abc", "ab"));

