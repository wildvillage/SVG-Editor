import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Position = {
  size: {
    width: number | null;
    height: number | null;
  };
};

const initialState: Position = {
  size: {
    width: null,
    height: null,
  },
};

export const positionSlice = createSlice({
  name: 'position',
  initialState,
  reducers: {
    setDashBoardSize(state, { payload }: PayloadAction<Position['size']>) {
      state.size = { ...payload };
    },
  },
});

export const { setDashBoardSize } = positionSlice.actions;

export default positionSlice.reducer;
