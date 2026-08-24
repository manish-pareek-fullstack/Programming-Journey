import { createSlice } from "@reduxjs/toolkit";
let insialstate = {
    value: 0,
}
export const counter = createSlice({
  name: "counter",
    insialstate,
    reducers: {
        increment: (state) => {
            state.value += 1
        },
        decrement: (state) => {
            state.value += -1;
        },
        restart: (state) => {
            state.value += 0;
        }
  }
});
export const { increment, decrement, restart } = counter.actions;
export default counter.reducer;