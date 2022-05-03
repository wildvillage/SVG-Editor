import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DashBoard } from './type';

const initialState: DashBoard = {
  line: [],
  rect: [],
};

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    getState(state) {
      console.log(state.line);
      return state;
    },
    setLine(state, { payload }: PayloadAction<DashBoard['line']>) {
      state.line = payload;
    },
    setRect(state, { payload }: PayloadAction<DashBoard['rect']>) {
      state.rect = payload;
    },
  },
});

export const { setRect, setLine, getState } = dashboardSlice.actions;

export default dashboardSlice.reducer;
