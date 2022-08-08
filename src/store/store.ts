import { configureStore } from '@reduxjs/toolkit'
import menuReducer from "../state/menuSlice"
import cartReducer from "../state/cartSlice"
import totalReducer from "../state/totalSlice"
import ordersReducer from "../state/ordersSlice"

export const store = configureStore({
  reducer: {
    menu: menuReducer,
    cart: cartReducer,
    total: totalReducer,
    orders: ordersReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch