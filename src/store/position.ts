import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Position = {
  position: {
    x: number,
    y: number,
  },
  size: {
    width: number | null,
    height: number | null,
  },
};

const initialState: Position = {
  position: {
    x: 0,
    y: 0,
  },
  size: {
    width: null,
    height: null,
  },
};

export const positionSlice = createSlice({
  name: 'position',
  initialState,
  reducers: {
    getPosition(state) {
      console.log(state);
    },
    setDashBoardSize(state, { payload }: PayloadAction<Position['size']>) {
      state.size = { ...payload };
    },
  },
});

export const { getPosition, setDashBoardSize } = positionSlice.actions;

export default positionSlice.reducer;
