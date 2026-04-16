import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import userSlice from "./userSlice";
import addressSlice from "./addressSlice.js";
import orderSlice from "./orderSlice.js";
import toastSlice from "./toastSlice.js"

const store = configureStore({
  reducer: {
    user: userSlice,
    cart: cartSlice,
    address : addressSlice,
    order:orderSlice,
    toast:toastSlice
  },
});

export default store;

store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem("cart", JSON.stringify(state.cart.items));
});
