import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DashBoard } from './type';

const initialState: DashBoard = {
  line: [],
  rect: [],
  render: [],
};

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setLine(state, { payload }: PayloadAction<DashBoard['line']>) {
      state.line = payload;
    },
    setRect(state, { payload }: PayloadAction<DashBoard['rect']>) {
      state.rect = payload;
    },
    addSvg(state, { payload }: PayloadAction<DashBoard['render']>) {
      state.render = payload;
    },
  },
});

export const { setRect, setLine, addSvg } = dashboardSlice.actions;

export default dashboardSlice.reducer;
