import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  name: string | null;
  email: string | null;
  image: string | null;
  isLoggedIn: boolean;
  moviePreferences: string[];
  newsPreferences: string[];
  socialPreferences: string[];
  lastUpdated: number | null; 
}

const initialState: UserState = {
  name: null,
  email: null,
  image: null,
  isLoggedIn: false,
  moviePreferences: [],
  newsPreferences: [],
  socialPreferences: [],
  lastUpdated: null, 
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<Omit<UserState, "isLoggedIn" | "lastUpdated">>) {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.image = action.payload.image;
      state.moviePreferences = action.payload.moviePreferences;
      state.newsPreferences = action.payload.newsPreferences;
      state.socialPreferences = action.payload.socialPreferences;
      state.isLoggedIn = true;
      state.lastUpdated = Date.now(); 
    },
    clearUser(state) {
      state.name = null;
      state.email = null;
      state.image = null;
      state.isLoggedIn = false;
      state.moviePreferences = [];
      state.newsPreferences = [];
      state.socialPreferences = [];
      state.lastUpdated = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
