import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


const localCart = localStorage.getItem("total") ? JSON.parse(localStorage.getItem("total") !) : 0;

export interface TotalState {
  total: number
}

const initialState: TotalState = {
  total: localCart,
}

export const TotalState = createSlice({
  name: 'total',
  initialState,
  reducers: {
    addToTotal: (state, action: PayloadAction < number > ) => {
      if (state.total === 0 && action.payload < 0) {
        state.total = 0
      } else {
        state.total += action.payload
      }
    },
    resetTotal: (state) => {
      state.total = 0;
    }
  },
})

export const { addToTotal, resetTotal } = TotalState.actions

export default TotalState.reducer