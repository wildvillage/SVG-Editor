import { configureStore } from '@reduxjs/toolkit';
import positionReducer from './position';
import toolReducer from './tool';
import dashboardReducer from './dashboard';

export const store = configureStore({
  reducer: {
    position: positionReducer,
    tool: toolReducer,
    dashboard: dashboardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
