import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { THUNK_STATUS } from "../../constants/thunkStatus";
import { orderService } from "../../services/orderService";
import { getCart } from "./cartReducer";

const initialState = {
  orderInfo: {},
  checkoutStatus: THUNK_STATUS.fulfilled,
};

export const { reducer: orderReducer, actions: orderActions } = createSlice({
  initialState,
  name: "order",
  reducers: {},
  extraReducers: (builder) => {
    // Get Order
    builder.addCase(getOrder.fulfilled, (state, action) => {
      state.orderInfo = action.payload;
    });
    // Checkout
    builder.addCase(checkout.fulfilled, (state) => {
      state.checkoutStatus = THUNK_STATUS.fulfilled;
    });
    builder.addCase(checkout.pending, (state) => {
      state.checkoutStatus = THUNK_STATUS.pending;
    });
    builder.addCase(checkout.rejected, (state) => {
      state.checkoutStatus = THUNK_STATUS.rejected;
    });
  },
});

export const getOrder = createAsyncThunk(
  "order/getorder",
  async (_, thunkAPI) => {
    try {
      const orderRes = await orderService.getOrder();
      if (orderRes?.data?.data) {
        const modOrderRes = { ...orderRes?.data?.data };
        thunkAPI.fulfillWithValue(modOrderRes);
        return modOrderRes;
      }
      console.log("res :>> ", res);
    } catch (error) {
      console.log("error :>> ", error);
      thunkAPI.rejectWithValue(error);
      throw error;
    }
  }
);

export const checkout = createAsyncThunk(
  "order/checkout",
  async (payload, thunkAPI) => {
    try {
      const checkoutRes = await orderService.checkout(payload);
      const checkoutData = checkoutRes?.data?.data;

      if (checkoutData) {
        // Get Order
        thunkAPI.dispatch(getOrder()).unwrap();
        thunkAPI.dispatch(getCart());
        thunkAPI.fulfillWithValue(checkoutData);
        return checkoutData;
      }
    } catch (error) {
      thunkAPI.rejectWithValue(error);
      throw error;
    }
  }
);
