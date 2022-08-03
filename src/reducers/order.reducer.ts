import { items } from "../utils/types";

export const orderReducer = (
  state: items[] = [],
  action: { type: string; payload: items }
) => {
  let inCart;
  switch (action.type) {
    case "ADD_TO_CART":
      inCart = state.find((order) => order.id === action.payload.id);
      if (inCart) {
        return state.map((order) => {
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
        return [...state, { ...action.payload, orderQty: 1 }];
      }
    case "REMOVE_FROM_CART":
      return state.map((order) => {
        if (order.id === action.payload.id) {
          if (order.orderQty !== 0) {
            return {
              ...order,
              orderQty: order.orderQty - 1,
            };
          } else {
            return {
              ...order,
              orderQty: 0,
            };
          }
        } else {
          return order;
        }
      });
    case "DELETE_FROM_CART":
      return state.filter((item) => item.id !== action.payload.id);
    default:
      return state;
  }
};
