import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Movie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  release_date: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  original_language: string;
  genre_ids: number[];
  adult: boolean;
}

interface MoviesState {
  data: Record<number, Movie[]>; 
}

const initialState: MoviesState = {
  data: {},
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    cacheMovies: (state, action: PayloadAction<{ page: number; movies: Movie[] }>) => {
      state.data[action.payload.page] = action.payload.movies;
    },
  },
});

export const { cacheMovies } = moviesSlice.actions;
export default moviesSlice.reducer;
