import { createSlice } from "@reduxjs/toolkit";
export const slicesignup = createSlice({
  name: 'signup',
  initialState: {
    user:[]
  }
,
  reducers: {
    adduser: ((state, action) => { state.user = action.payload })
  }
})
export const { adduser } = slicesignup.actions;
export default slicesignup.reducer;
