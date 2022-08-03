export const cart = (price: number) => {
  console.log(price);
  return { type: "ADD_TO_TOTAL", payload: price };
};
