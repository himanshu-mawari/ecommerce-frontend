import { createSlice } from "@reduxjs/toolkit";

const loadAddresses = () => {
  try {
    const data = localStorage.getItem("shippingAddress");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const loadSelectedAddressId = () => {
  try {
    const data = localStorage.getItem("shippingAddressId");
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};

const saveAddresses = (addresses) => {
  localStorage.setItem("shippingAddress", JSON.stringify(addresses));
};

const addressSlice = createSlice({
  name: "address",
  initialState: {
    addresses: loadAddresses(),
    selectedAddressId: loadSelectedAddressId(),
  },
  reducers: {
    addAddress: (state, action) => {
      const newAddress = { id: Date.now(), ...action.payload };
      state.addresses.unshift(newAddress);
      saveAddresses(state.addresses);

      state.selectedAddressId = newAddress.id;
      localStorage.setItem("shippingAddressId", JSON.stringify(newAddress.id));
    },
    editAddress: (state, action) => {
      state.addresses = state.addresses.map((addr) =>
        addr.id === action.payload.id ? action.payload : addr,
      );
      saveAddresses(state.addresses);
    },
    deleteAddress: (state, action) => {
      state.addresses = state.addresses.filter(
        (addr) => addr.id !== action.payload,
      );
      if (state.selectedAddressId === action.payload) {
        if (state.addresses.length !== 0) {
          state.selectedAddressId = state.addresses[0].id;
        }
      } else {
        state.selectedAddressId = null;
      }
      saveAddresses(state.addresses);
    },
    selectAddress: (state, action) => {
      state.selectedAddressId = action.payload;
      localStorage.setItem("shippingAddressId", JSON.stringify(action.payload));
    },
  },
});

export const { addAddress, editAddress, deleteAddress, selectAddress } =
  addressSlice.actions;
export default addressSlice.reducer;
