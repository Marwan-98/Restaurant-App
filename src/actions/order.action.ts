import { items } from "../utils/types";

export const addOrderItem = (item: items) => {
  return {
    type: "ADD_TO_CART",
    payload: item,
  };
};

export const removeOrderItem = (item: items) => {
  return {
    type: "REMOVE_FROM_CART",
    payload: item,
  };
};

export const deleteOrderItem = (item: items) => {
  return {
    type: "DELETE_FROM_CART",
    payload: item,
  };
};

export const resetOrderItems = () => {
  return {
    type: "RESET_CART",
    payload: []
  }
}
