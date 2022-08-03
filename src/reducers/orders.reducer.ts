import { orders } from "../utils/types";

export const ordersReducer = (
  state: orders[] = [],
  action: {
    type: string;
    payload: { orders: orders[]; orderId: number; itemId: number };
  }
) => {
  switch (action.type) {
    case "GET_ORDERS":
      return [...action.payload.orders];
    case "CHECK":
      return state.map((order) => {
        if (order.id === action.payload.orderId) {
          return {
            ...order,
            orderLine: order.orderLine.map((item) => {
              if (item.id === action.payload.itemId) {
                return { ...item, completed: !item.completed };
              } else {
                return item;
              }
            }),
          };
        } else {
          return order;
        }
      });
    default:
      return state;
  }
};
