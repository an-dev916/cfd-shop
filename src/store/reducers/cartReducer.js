import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import { LOCAL_STORAGE } from "../../constants/localStorage";
import { THUNK_STATUS } from "../../constants/thunkStatus";
import authService from "../../services/authService";
import cartService from "../../services/cartService";

const initialState = {
  cartInfo: {},
  updateStatus: THUNK_STATUS.fulfilled,
  getStatus: THUNK_STATUS.fulfilled,
};

export const { reducer: cartReducer, actions: cartActions } = createSlice({
  initialState,
  name: "cart",
  reducers: {
    clearCart: (state) => {
      state.cartInfo = {};
    },
    setCart: (state, action) => {
      console.log("action :>> ", action);
      state.cartInfo = action.payload;
    },
    updateCacheCart: (state, action) => {
      state.cartInfo = action.payload || state.cartInfo;
    },
  },
  extraReducers: (builder) => {
    // GET CART
    builder.addCase(getCart.pending, (state) => {
      state.getStatus = THUNK_STATUS.pending;
    });
    builder.addCase(getCart.fulfilled, (state, action) => {
      state.getStatus = THUNK_STATUS.fulfilled;
      state.cartInfo = action.payload;
    });
    builder.addCase(getCart.rejected, (state) => {
      state.getStatus = THUNK_STATUS.rejected;
      state.cartInfo = {};
    });

    // UPDATE CART
    builder.addCase(updateCart.pending, (state) => {
      state.updateStatus = THUNK_STATUS.pending;
    });
    builder.addCase(updateCart.fulfilled, (state) => {
      // Do API của update trả về thiếu thông tin chi tiết
      // Nên case fulfilled lúc này không cần cập nhật lại cartInfo như getCart
      state.updateStatus = THUNK_STATUS.fulfilled;
    });
    builder.addCase(updateCart.rejected, (state) => {
      state.updateStatus = THUNK_STATUS.rejected;
    });
  },
});

export const getCart = createAsyncThunk(
  "cart/getcart",
  async (payload, thunkApi) => {
    // Thông thường khi get 1 thông tin nào đó từ API thì tham số payload ko cần truyền vào cũng dc
    console.log("payload :>> ", payload);
    try {
      const cartRes = await cartService.getCart();
      console.log("cartRes getCart:>> ", cartRes);

      // Nếu 1 account mới thì data trả về sẽ là [] rỗng
      const cartInfo = { ...cartRes.data?.data };
      console.log("getcart INFO :>> ", cartInfo);

      // Xử lý API trả về khi Backend chưa tính toán dữ liệu
      // (thông thường sẽ không cần xử lý luôn do mỗi lần cập nhật cart các key như total, subTotal.. sẽ được phía backend tính toán)
      // 1. Subtotal price
      const subTotal = cartInfo.quantity?.reduce((curr, next, index) => {
        return (
          curr + Number(next) * Number(cartInfo.product?.[index].price || 0)
        );
      }, 0);

      // 2. Total price (sau khi trừ khuyến mãi, coupoun..hoặc thêm phí vận chuyển...)
      const total =
        subTotal -
        subTotal * ((cartInfo.discount || 0) / 100) +
        (cartInfo.shipping?.price || 0);

      3;

      // 3. Tổng só lượng sản phẩm có trong cart
      const totalProduct =
        cartInfo.quantity?.reduce(
          (curr, next) => Number(curr) + Number(next),
          0
        ) || 0;

      // 4. Update lại cart
      const modCartInfo = {
        ...cartInfo,
        total,
        subTotal,
        totalProduct: [totalProduct.toString()],
      };

      console.log("modCartInfo :>> ", modCartInfo);

      thunkApi.fulfillWithValue(modCartInfo);
      return modCartInfo;
    } catch (error) {
      thunkApi.rejectWithValue(error);
      throw error;
    }
  }
);

export const updateCart = createAsyncThunk(
  "cart/updatecart",
  async (payload, thunkApi) => {
    console.log("payload :>> ", payload);
    try {
      const cartRes = await cartService.updateCart({
        ...payload,
        subTotal: 0,
        total: 0,
        totalProduct: [0],
        discount: 0,
        paymentMethod: "string",
      });
      console.log("cartRes updateCart:>> ", cartRes);
      const cartInfo = cartRes.data.data;
      // Cập nhật lại cartInfo trong state bằng cách getCart do cartRes trả về lúc này chưa có thông tin chi tiết về product,...
      thunkApi.dispatch(getCart());

      thunkApi.fulfillWithValue(cartInfo);
      return cartInfo;
    } catch (error) {
      thunkApi.rejectWithValue(error);
      throw error;
    }
  }
);
