import { configureStore } from "@reduxjs/toolkit";
import slice from "./SignupSlice";
import  {apislice}  from "./apislice";
export const store = configureStore({
  reducer: {
    userData: slice,
    
    [apislice.reducerPath]: apislice.reducer,
  },
  middleware: (GetDefaultmiddelware) => {
   return GetDefaultmiddelware().concat(apislice.middleware)
 }
});
