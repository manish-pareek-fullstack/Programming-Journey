import { configureStore } from "@reduxjs/toolkit";
import autherreducer from '../slice/slicesignup';
import cartReducer from '../slice/slicecart'
export const store = configureStore({
  reducer: {
    signup: autherreducer,
    cart: cartReducer,
  },
});