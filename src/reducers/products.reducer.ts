import { items } from "../utils/types";

export const productsReducer = (
  state: items[] = [],
  action: { type: string;payload: { products: items[];id: number } }
) => {
  switch (action.type) {
    case "GET_PRODUCTS":
      return [...action.payload.products];
    case "ADD_QUANTITY":
      return state.map((item) => {
        if (item.id === action.payload.id) {
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
    case "SUBTRACT_QUANTITY":
      return state.map((item) => {
        if (item.id === action.payload.id) {
          if (item.orderQty !== 0) {
            return {
              ...item,
              orderQty: item.orderQty - 1,
            };
          } else {
            return {
              ...item,
              orderQty: 0,
            };
          }
        } else {
          return item;
        }
      });
    case "REMOVE_QUANTITY":
      return state.map((item) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            orderQty: 0,
          };
        } else {
          return item;
        }
      });
    default:
      return state;
  }
};