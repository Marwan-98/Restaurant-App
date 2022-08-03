import { combineReducers } from "redux";
import { cart } from "./cart.reducer";
import { orderReducer } from "./order.reducer";
import { productsReducer } from "./products.reducer";
import { ordersReducer } from "./orders.reducer";

export const reducers = combineReducers({
  cart: cart,
  products: productsReducer,
  order: orderReducer,
  orders: ordersReducer,
});
