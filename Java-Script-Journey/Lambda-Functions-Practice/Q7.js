//7.Write a lambda function that returns “positive” if a number > 0 if num==0 then “ZERO” else “negative”.

//  let checkNum = (num) => (num > 0 ? "positive" : num === 0 ? "ZERO":"negative");
// console.log(checkNum(5));
// console.log(checkNum(0));
//  console.log(checkNum(-3));

// let str = 'javascript';
// let obj = {};
// for (let i = 0; i < str.length; i++){
//     let char = str[i];
//     if (obj[char]) {
//         obj[char]++;
//     }
//     else {
//         obj[char] = 1;
//     }
// }
// console.log(obj);

// let str = "I am learning javasckjfwdskjfhjksdhfkjript";
// let word = "";
// let logest = "";
// for (let i = 0; i < str.length; i++){
//     if (str[i] !== ' ') {
//         word += str[i];
//     }
//     else {
//         if (word.length > logest.length) {
//             logest = word;
//         }
//         word = "";
//     }
// }
// if (word.length > logest.length) {
//     logest = word;
// }
// console.log('logest',logest)
let promise = new Promise((resolve, reject) => {
    let success = false;
    if (success) {
        resolve("success:")
    }
    else {
        reject("error");
    }
});
promise.then((res) => console.log(res))
.catch((err)=>console.log(err))