import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addProduct: {},
    removeProduct: {},
    updateQuantity: {},
  },
});

export const { addProduct, removeProduct, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
