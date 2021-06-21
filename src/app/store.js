import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlicecopy';

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
