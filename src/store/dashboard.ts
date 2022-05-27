import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DashBoard, RenderItem } from './type';

const initialState: DashBoard = {
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
    removeRenderItem(state, { payload }: PayloadAction<string>) {
      state.render = state.render.filter((r) => r.id !== payload);
    },
    reset(state, {}: PayloadAction<DashBoard['render']>) {
      state.render = [];
    },
    add(state, { payload }: PayloadAction<RenderItem>) {
      state.render = [...state.render, payload];
    },
    remove(state, { payload }: PayloadAction<string>) {
      state.render = state.render.filter((r) => r.id !== payload);
    },
    replace(
      state,
      {
        payload: { index, item },
      }: PayloadAction<{ index: number; item: RenderItem }>
    ) {
      state.render.splice(index, 1, item);
      state.render = [...state.render];
    },
    pop(state) {
      state.render.pop();
      state.render = [...state.render];
    },
  },
});

export const {
  setRect,
  setLine,
  addSvg,
  removeRenderItem,
  reset,
  add,
  remove,
  replace,
  pop,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
