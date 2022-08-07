export const addTotal = (price: number) => {
  return { type: "ADD_TO_TOTAL", payload: price };
};


export const resetTotal = () => {
  return {type: "RESET_TOTAL", payload: 0};
}