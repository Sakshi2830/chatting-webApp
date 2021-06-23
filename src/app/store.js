import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlicecopy';
import threadReducer from '../features/threadSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    thread: threadReducer,
  },
});
