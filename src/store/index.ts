import { configureStore } from '@reduxjs/toolkit';
import positionReducer from './position';

export const store = configureStore({
  reducer: {
    position: positionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
