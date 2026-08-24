// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// const SignupSlice = createSlice({
//     name: 'Signup', //  jo store me use krege 
//     initialState: {
//         user:[] // jo bhi user ka data aayega vo user array me store hoga 
//     },
//     reducers: {
//         adduser: (state,action)=> {
//             state.user.push(action.payload);
//         }
//     }
// })
// // export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
// //   const res = await fetch("https://jsonplaceholder.typicode.com/users");
// //     return res.json();
// //     extraReducers: (builder) => {
// //         builder.addcase(fetch.fulfil, (state, action) => {
// //             state.user=action.payload
// //         })
// //     }
// // });

// export const { adduser } = SignupSlice.actions;
// export default SignupSlice.reducer