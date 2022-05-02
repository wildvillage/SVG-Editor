import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Tool } from './type';

const initialState: Tool = {
  showSplitLine: true,
};

export const dashboardSlice = createSlice({
  name: 'position',
  initialState,
  reducers: {
    toggleSplitLine(state) {
      state.showSplitLine = !state.showSplitLine;
    },
  },
});

export const { toggleSplitLine } = dashboardSlice.actions;

export default dashboardSlice.reducer;
