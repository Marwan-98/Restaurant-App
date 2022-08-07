import { orders } from "../utils/types";

export const getOrders = (orders: orders[]) => {
  return {
    type: "GET_ORDERS",
    payload: { orders: orders },
  };
};

export const modifyOrders = (orderId: number, itemId: number) => {
  return {
    type: "CHECK",
    payload: { orderId: orderId, itemId: itemId },
  };
};