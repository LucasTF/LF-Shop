import { Cart, CartItem } from "../../definitions/types";
import addTwoDecimals from "../../utils/addTwoDecimals";

type Action<T> = {
  payload: T;
  type: string;
};

export const addToCartReducer = (state: Cart, action: Action<CartItem>) => {
  const item = action.payload;

  const existItem = state.cartItems.find((ci) => ci._id === item._id);

  if (existItem)
    state.cartItems = state.cartItems.map((ci) =>
      ci._id === existItem._id ? item : ci
    );
  else state.cartItems = [...state.cartItems, item];

  updateStorageCart(state);
};

export const removeFromCartReducer = (state: Cart, action: Action<string>) => {
  state.cartItems = state.cartItems.filter(
    (item) => item._id !== action.payload
  );

  updateStorageCart(state);
};

export const clearCartReducer = (state: Cart) => {
  state.cartItems = [];

  updateStorageCart(state);
};

const updateStorageCart = (state: Cart) => {
  // Items Price
  state.itemsPrice = addTwoDecimals(
    state.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  );

  // Shipping Price (Calculation of shipping dependent)
  state.shippingPrice = 0;

  // Tax Price (Calculation of tax dependent)
  state.taxPrice = 0;

  // Total Price
  state.totalPrice = addTwoDecimals(
    state.itemsPrice + state.shippingPrice + state.taxPrice
  );

  localStorage.setItem("cart", JSON.stringify(state));
};
