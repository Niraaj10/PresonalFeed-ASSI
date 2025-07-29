import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./slices/movies";
import userReducer from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
