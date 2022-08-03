import { items } from "../utils/types";

export const getProducts = (products: items[]) => {
  return { type: "GET_PRODUCTS", payload: { products: products } };
};

export const addQuantity = (id: number) => {
  return { type: "ADD_QUANTITY", payload: { id: id } };
};

export const subtractQuantity = (id: number) => {
  return { type: "SUBTRACT_QUANTITY", payload: { id: id } };
};

export const removeQuantity = (id: number) => {
  return { type: "REMOVE_QUANTITY", payload: { id: id } };
};
