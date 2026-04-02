import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";

const store = configureStore({
  reducer: {
    cart: cartSlice,
  },
});

export default store;

store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem("cart", JSON.stringify(state.cart.items));
});
