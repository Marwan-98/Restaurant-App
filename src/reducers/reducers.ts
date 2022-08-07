import { combineReducers } from "redux";
import { cartTotal } from "./total.reducer";
import { orderReducer } from "./order.reducer";
import { productsReducer } from "./products.reducer";
import { ordersReducer } from "./orders.reducer";

export const reducers = combineReducers({
  total: cartTotal,
  products: productsReducer,
  order: orderReducer,
  orders: ordersReducer,
});
