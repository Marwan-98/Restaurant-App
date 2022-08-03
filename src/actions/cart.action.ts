export const cart = (price: number) => {
  return { type: "ADD_TO_TOTAL", payload: price };
};


export const resetCart = () => {
  return {type: "RESET_TOTAL", payload: 0};
}