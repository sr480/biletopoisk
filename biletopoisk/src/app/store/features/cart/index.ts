import { createSlice } from "@reduxjs/toolkit";

export type CartState = { [key: string]: number };

const initialState: CartState = {};

const maxFilms = 30;

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    increment: (state, { payload }) => {
      const count = state[payload] || 0;
      const total = Object.values(state).reduce((a, c) => a + c, 0);
      if (total >= maxFilms) {
        return;
      }
      state[payload] = count + 1;
    },
    decrement: (state, { payload }) => {
      const count = state[payload];
      if (!count) {
        return;
      }

      if (count === 1) {
        delete state[payload];
        return;
      }

      state[payload] = count - 1;
    },
    reset: (state, { payload }) => {
      delete state[payload]
    },
  },
});

export const cartReducer = cartSlice.reducer;
export const cartActions = cartSlice.actions;
