import { intialCart } from "../utils/orderinitial";
import { items } from "../utils/types";

const localCart = localStorage.getItem("total") !== null ? JSON.parse(localStorage.getItem("total") !) : 0

export const cartTotal = (
    state = localCart,
    action: { type: string;payload: number }
) => {
    switch (action.type) {
        case "ADD_TO_TOTAL":
            if (state === 0 && action.payload < 0) {
                return state;
            } else {
                return (state += action.payload);
            }
        case "RESET_TOTAL":
            return action.payload;
        default:
            return state;
            break;
    }
};