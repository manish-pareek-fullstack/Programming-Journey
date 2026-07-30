import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../slice/slicecounter";
export const store = configureStore({
  reducer: {
    conter: counterReducer,
  },
});