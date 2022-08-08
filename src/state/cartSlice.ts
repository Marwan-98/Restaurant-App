import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { items } from "../utils/types";

const localCart = localStorage.getItem("orders") ? JSON.parse(localStorage.getItem("orders") !) : [];

export interface CartState {
  cart: items[];
}

const initialState: CartState = {
  cart: localCart,
};

let inCart;

export const CartState = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<items>) => {
      inCart = state.cart.find((order) => order.id === action.payload.id);
      if (inCart) {
        state.cart = state.cart.map((order) => {
          if (order.id === action.payload.id) {
            return {
              ...order,
              orderQty: order.orderQty + 1,
            };
          } else {
            return order;
          }
        });
      } else {
        state.cart = [...state.cart, { ...action.payload, orderQty: 1 }];
      }
    },
    removeFromCart: (state, action: PayloadAction<items>) => {
      state.cart = state.cart.map((order) => {
        if (order.id === action.payload.id) {
          if (order.orderQty !== 0) {
            return {
              ...order,
              orderQty: order.orderQty - 1,
            };
          } else {
            return order
          }
        } else {
          return order;
        }
      }).filter((item) => item.orderQty > 0);
    },
    deleteFromCart: (state, action: PayloadAction<items>) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload.id);
    },
    resetCart: (state) => {
      state.cart = [];
    },
  },
});

export const { addToCart, removeFromCart, deleteFromCart, resetCart } =
  CartState.actions;

export default CartState.reducer;
