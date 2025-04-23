import { createSlice } from "@reduxjs/toolkit";

const initialCartState = {
  products: [], // No items in the cart intially
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.products.find(
        (product) => product.product_id === action.payload.product_id
      );
      if (existingItem) {
        // If the item already exists in the cart, update its quantity
        existingItem.quantity += action.payload.quantity;
      } else {
        // If the item doesn't exist, add it to the cart
        action.payload.quantity = action.payload.quantity || 1; // qty 1 as default
        state.products.push(action.payload);
      }
    },
    removeFromCart: (state, action) => {
      const removedItem = action.payload;
      state.products = state.products.filter(
        (product) => product.product_id !== removedItem.product_id
      );
    },
    clearCart: (state) => {
      state.products = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
