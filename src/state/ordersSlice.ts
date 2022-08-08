import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { orders } from "../utils/types";
import { order } from "../utils/types";

export interface OrdersState {
	orders: orders[]
}

const initialState: OrdersState = {
	orders: []
}

export const OrdersState = createSlice({
	name: "orders",
	initialState,
	reducers: {
		getOrders: (state, action: PayloadAction < orders[] > ) => {
			state.orders = [...action.payload]
		},
		check: (state, action:  PayloadAction < order >) => {
			state.orders = state.orders.map((order) => {
				if (order.id === action.payload.orderId) {
					return {
						...order,
						orderLine: order.orderLine.map((item) => {
							if (item.id === action.payload.itemId) {
								return { ...item, completed: !item.completed };
							} else {
								return item;
							}
						})
					};
				} else {
					return order;
				}
			});
		}
	}
})

export const {getOrders, check} = OrdersState.actions;
export default OrdersState.reducer