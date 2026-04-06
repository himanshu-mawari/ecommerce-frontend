import { createSlice } from "@reduxjs/toolkit";

const loadAddresses = () => {
  try {
    const data = localStorage.getItem("shippingAddress");
    const res = data ? JSON.parse(data) : [];
    return res;
  } catch {
    return [];
  }
};
const addressSlice = createSlice({
  name: "address",
  initialState: {
    addresses: loadAddresses(),
    selectedAddressId: null,
  },
  reducers: {
    addAddresses: (state, action) => {
      
      state.addresses = action.payload;
    },
    addSelectedAddressId: (state, action) => {
      state.selectedAddressId = action.payload;
    },
  },
});

export const { addAddresses, addSelectedAddressId } = addressSlice.actions;
export default addressSlice.reducer;
