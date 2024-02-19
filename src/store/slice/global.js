import { createSlice } from '@reduxjs/toolkit';
import { globalData } from '../thunk/index';


export const globalSlice = createSlice({
  name: 'global',
  initialState: {
    data: {},
  },
  reducers: {

  },
  extraReducers: builder => {
    builder.addCase(globalData.fulfilled, (state, action) => {
      state.data = action.payload
    })
  }
})

export default globalSlice.reducer
