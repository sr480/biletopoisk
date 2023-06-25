import {
  combineReducers,
  configureStore,
  PreloadedState,
} from "@reduxjs/toolkit";
import { cartReducer } from "./features/cart";
import { filmsApi } from "./services/filmsApi";

const rootReducer = combineReducers({
  cart: cartReducer,
  [filmsApi.reducerPath]: filmsApi.reducer,
});

export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(filmsApi.middleware),
  });
}

export const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = typeof store;
