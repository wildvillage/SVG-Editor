import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Tool } from './type';

const initialState: Tool = {
  showSplitLine: true,
  currentForm: {},
};

export const dashboardSlice = createSlice({
  name: 'tool',
  initialState,
  reducers: {
    toggleSplitLine(state) {
      state.showSplitLine = !state.showSplitLine;
    },
    setCurrentForm(state, { payload }) {
      state.currentForm = payload;
    },
  },
});

export const { toggleSplitLine, setCurrentForm } = dashboardSlice.actions;

export default dashboardSlice.reducer;
