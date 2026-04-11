import { createSlice } from "@reduxjs/toolkit";


const loadOrder = () => {
  try {
    const data = localStorage.getItem("orderDetails");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};


const saveOrder = (order) => {
  localStorage.setItem("orderDetails", JSON.stringify(order));
};

const orderSlice = createSlice({
  name: "order",
  initialState: {
    order: loadOrder(),
  },
  reducers: {
    addOrder: (state, action) => {
      state.order.unshift(action.payload);
            saveOrder(state.order);
    },
  },
});

export const { addOrder } = orderSlice.actions;
export default orderSlice.reducer;
