import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import userSlice from "./userSlice";
import addressSlice from "../store/addressSlice.js";
import orderSlice from "../store/orderSlice.js";

const store = configureStore({
  reducer: {
    user: userSlice,
    cart: cartSlice,
    address : addressSlice,
    order:orderSlice
  },
});

export default store;

store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem("cart", JSON.stringify(state.cart.items));
});
