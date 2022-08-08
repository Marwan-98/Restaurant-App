import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { items } from "../utils/types";

export interface MenuState {
  menu: items[]
}

const initialState: MenuState = {
  menu: [],
}


export const MenuState = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    getProducts: (state, action: PayloadAction <items[]>) => {
      state.menu = [...action.payload]
    },
    addQuantity: (state, action: PayloadAction < number > ) => {
      state.menu = state.menu.map((item) => {
        if (item.id === action.payload) {
          if (!item.orderQty) {
            return {
              ...item,
              orderQty: 1,
            };
          } else {
            return {
              ...item,
              orderQty: item.orderQty + 1,
            };
          }
        } else {
          return item;
        }
      });
    },
    subtractQuantity: (state, action: PayloadAction < number > ) => {
      state.menu = state.menu.map((item) => {
        if (item.id === action.payload) {
          if (item.orderQty !== 0) {
            return {
              ...item,
              orderQty: item.orderQty - 1,
            };
          } else {
            return item
          }
        } else {
          return item;
        }
      });
    },
    removeQuantity: (state, action: PayloadAction < number > ) => {
      state.menu = state.menu.map((item) => {
        if (item.id === action.payload) {
          return {
            ...item,
            orderQty: 0,
          };
        } else {
          return item;
        }
      });
    }

  },
})

export const { getProducts, addQuantity, subtractQuantity, removeQuantity } = MenuState.actions

export default MenuState.reducer