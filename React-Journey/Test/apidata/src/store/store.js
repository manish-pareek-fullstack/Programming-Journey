import { configureStore } from "@reduxjs/toolkit";
import  autherreducer  from "../slice/slicesignup";
export const store = configureStore({
  reducer: {
    api: autherreducer,
  },
});
