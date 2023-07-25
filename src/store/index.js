import { configureStore } from "@reduxjs/toolkit";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import counterReducer from "./reducers/counterReducer";
import dogReducer from "./reducers/dogReducer";
import thunkMiddleware from "redux-thunk";
import { ENV } from "../constants/environments";
import { authReducer } from "./reducers/authenReducer";
import { cartReducer } from "./reducers/cartReducer";
import { orderReducer } from "./reducers/orderReducer";
// export const reducers = combineReducers({
//   counter: counterReducer,
//   dog: dogReducer,
//   auth: authReducer,
// });

// const middleware = (store) => (next) => (action) => {
//   if (typeof action === "function") {
//     action(store.dispatch);
//     return;
//   }
//   next(action);
// };

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION || compose;

// const store = createStore(
//   reducers,
//   composeEnhancers(applyMiddleware(middleware))
// );

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    order: orderReducer,
    counter: counterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunkMiddleware),
  devTools: ENV === "development",
});

export default store;
