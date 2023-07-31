import { createSlice } from "@reduxjs/toolkit";

import { Cart } from "../definitions/types";
import { addToCartReducer } from "../reducers/cart/cartReducers";

const initialState: Cart = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart")!)
  : { cartItems: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => addToCartReducer(state, action),
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
