import { createSlice } from "@reduxjs/toolkit";

import { Cart } from "../definitions/types";
import {
  addToCartReducer,
  clearCartReducer,
  removeFromCartReducer,
} from "../reducers/cart/cartReducers";

const initialState: Cart = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart")!)
  : { cartItems: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => addToCartReducer(state, action),
    removeFromCart: (state, action) => removeFromCartReducer(state, action),
    clearCart: (state) => clearCartReducer(state),
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
