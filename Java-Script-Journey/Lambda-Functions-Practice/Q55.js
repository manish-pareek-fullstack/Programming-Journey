// Question 55
const validParentheses = s => {let st=[]; return [...s].every(c=>c==='('?st.push(c):(st.length&&st.pop())) && !st.length;};