import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const fatchcart = createAsyncThunk("cart/fatchcart", async (id) => {
  const res = await axios.get(`https://dummyjson.com/carts/${id}`);
  return res.data;
});
const slicecart = createSlice({
  name: "cart",
  initialState: {
    cartData: [],
    loading: false,
    error: null,
  },
  reducers: {
    deleteProduct: (state, action) => {
      state.cartData[0].products = state.cartData[0].products.filter(
        (item) => item.id !== action.payload,
      );
    },
    placeOrder: (state) => {
      state.cartData[0].products = state.cartData[0].products.map((item) => ({
        ...item,
        isOrdered: true,
      }));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fatchcart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartData = [action.payload];
      })
      .addCase(fatchcart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fatchcart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export const { deleteProduct, placeOrder } = slicecart.actions;
export default slicecart.reducer
