import { createSlice } from "@reduxjs/toolkit";

const loadCart = () => {
  try {
    const data = localStorage.getItem("cart");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: loadCart(),
  },
  reducers: {
    addProduct: (state, action) => {
      let { id, size, quantity } = action.payload;

      const itemExist = state.items.find((p) => p.id === id && p.size === size);
      if (itemExist) {
        itemExist.quantity = quantity + 1;
      } else {
        state.items.push(action.payload);
      }
    },
    increaseQuantity: (state, action) => {
      let { id, size, quantity } = action.payload;

      const findProduct = state.items.find(
        (p) => p.id === id && p.size === size,
      );

      if (findProduct) {
        findProduct.quantity = quantity + 1;
      }
    },
    decreaseQuantity: (state, action) => {
      let { id, size, quantity } = action.payload;

      const findProduct = state.items.find(
        (p) => p.id === id && p.size === size,
      );

      if (findProduct) {
        if (findProduct.quantity > 1) {
          findProduct.quantity = quantity - 1;
        } else {
          state.items = state.items.filter(
            (p) => p.id !== id && p.size !== size,
          );
        }
      }
    },
    removeProduct: (state, action) => {
      let { id, size } = action.payload;

      state.items = state.items.filter((p) => p.id !== id && p.size !== size);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addProduct, removeProduct, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
