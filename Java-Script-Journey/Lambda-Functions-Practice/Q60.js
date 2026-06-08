// Question 60
const palAndReverse = n => {const r=+n.toString().split('').reverse().join(''); return {reverse:r,palindrome:n===r};};