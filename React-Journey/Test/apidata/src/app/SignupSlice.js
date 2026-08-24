import { createSlice } from "@reduxjs/toolkit";
let initialState = { name: "", email: "", password: "" };
const slice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    upt: (state, action) => {
      console.log('data',state.name)
      state.name = action.payload.name;
      state.password = action.payload.password;
      state.email= action.payload.email;
    },
  },
});
export const { upt } = slice.actions;
export default slice.reducer;
