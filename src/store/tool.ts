import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Tool } from './type';

const initialState: Tool = {
  showSplitLine: true,
  currentForm: {
    id: 1,
    attrs: {
      x1: 10,
      x2: 10,
      y1: 10,
      y2: 10,
      stroke: '#000',
    },
    type: 'line',
  },
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
