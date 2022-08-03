import { intialCart } from "../utils/orderinitial";
import { items } from "../utils/types";

export const cart = (
  state = intialCart,
  action: { type: string; payload: number }
) => {
  switch (action.type) {
    case "ADD_TO_TOTAL":
      if (state === 0 && action.payload < 0) {
        return state;
      } else {
        return (state += action.payload);
      }
    default:
      return state;
      break;
  }
};
