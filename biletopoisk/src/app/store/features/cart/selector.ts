import { RootState } from "../../store";

const selectCartModule = (state: RootState) => state.cart;

export const selectFilmAmount = (state: RootState, id: string) =>
  selectCartModule(state)[id] || 0;

export const selectCartTotal = (state: RootState) =>
  Object.values(selectCartModule(state)).reduce((a, c) => a + c, 0);

export const selectCartFilms = (state: RootState) =>
  Object.keys(selectCartModule(state));
