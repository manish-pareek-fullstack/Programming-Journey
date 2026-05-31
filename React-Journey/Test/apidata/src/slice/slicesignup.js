import { createSlice } from "@reduxjs/toolkit";
export const slicesignup = createSlice({
    name: 'api',
    initialState: {
        apidata:[]
    },
    reducers: {
        addapidata: ((state, action) => {
            state.apidata=action.payload
        })
    }
})
export const { addapidata } = slicesignup.actions;
export default slicesignup.reducer;