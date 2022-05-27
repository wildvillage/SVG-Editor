import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Tool } from './type';

const initialState: Tool = {
  showSplitLine: true,
  currentForm: {
    id: '',
    attrs: {
      x1: 10,
      x2: 10,
      y1: 10,
      y2: 10,
      stroke: '#000000',
    },
    type: 'line',
  },
  showSelector: false,
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
    setSelector(state, { payload }: PayloadAction<Tool['showSelector']>) {
      state.showSelector = payload;
    },
  },
});

export const { toggleSplitLine, setCurrentForm, setSelector } =
  dashboardSlice.actions;

export default dashboardSlice.reducer;
