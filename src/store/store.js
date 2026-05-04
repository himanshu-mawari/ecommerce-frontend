import { configureStore } from "@reduxjs/toolkit";
import addressSlice from "./addressSlice";
import orderSlice from "./orderSlice";
import cartSlice from "./cartSlice";
import userSlice from "./userSlice.js"
import toastSlice from "./toastSlice";

import { baseApi } from "../services/baseApi.js"; 

const store = configureStore({
  reducer: {
    user:userSlice,
    cart: cartSlice,
    address: addressSlice,
    order: orderSlice,
    toast: toastSlice,

    [baseApi.reducerPath]: baseApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export default store;