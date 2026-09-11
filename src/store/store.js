import { configureStore } from "@reduxjs/toolkit";
import addressSlice from "./addressSlice";

import { baseApi } from "../services/baseApi.js";

const store = configureStore({
  reducer: {
    address: addressSlice,

    [baseApi.reducerPath]: baseApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export default store;
