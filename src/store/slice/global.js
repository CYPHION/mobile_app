import { createSlice } from '@reduxjs/toolkit';
import { globalData } from '../thunk/index';

const initialState = {
  data: {}
}


export const globalSlice = createSlice({
  name: 'global',
  initialState: initialState,
  reducers: {
    handleResetData: (state, action) => {
      state.data = initialState.data;
      // AsyncStorage.removeItem('userData');
    },
  },
  extraReducers: builder => {
    builder.addCase(globalData.fulfilled, (state, action) => {
      state.data = action.payload
    })
  }
})

export default globalSlice.reducer

export const { handleResetData } = globalSlice.actions