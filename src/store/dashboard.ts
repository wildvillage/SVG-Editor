import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dashboard } from './type';

const initialState: Dashboard = {};

export const dashboardSlice = createSlice({
  name: 'position',
  initialState,
  reducers: {},
});

export const {} = dashboardSlice.actions;

export default dashboardSlice.reducer;
