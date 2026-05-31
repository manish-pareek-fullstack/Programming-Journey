import { configureStore } from "@reduxjs/toolkit";

import autherreducer from '../slice/slicesignup';
import counterauther from '../slice/slicecounter';
export const store = configureStore({
  reducer: {
    signup: autherreducer,
    counter:counterauther,
  },
});