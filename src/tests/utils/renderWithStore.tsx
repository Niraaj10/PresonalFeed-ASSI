import { render } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import userReducer from '@/store/slices/userSlice'; 
import { UserState } from '@/store/slices/userSlice';

type PreloadedState = {
  user: UserState;
};

const defaultState: PreloadedState = {
  user: {
    name: null,
    email: null,
    image: null,
    isLoggedIn: false,
    moviePreferences: [],
    newsPreferences: [],
    socialPreferences: [],
    lastUpdated: null,
  },
};

export function renderWithStore(
  ui: React.ReactElement,
  preloadedState: PreloadedState = defaultState
) {
  const store = configureStore({
    reducer: { user: userReducer },
    preloadedState,
  });

  return render(<Provider store={store}>{ui}</Provider>);
}
