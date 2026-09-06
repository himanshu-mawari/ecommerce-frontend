import { createSlice } from "@reduxjs/toolkit";

const addressSlice = createSlice({
  name: "address",
  initialState: {
    selectedAddressId: null,
  },
  reducers: {
    selectAddress: (state, action) => {
      state.selectedAddressId = action.payload;
    },
  },
});

export const { selectAddress } = addressSlice.actions;
export default addressSlice.reducer;