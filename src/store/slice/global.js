import { createSlice } from '@reduxjs/toolkit';
import { globalData } from '../thunk/index';

const initialState = {
  data: {},
  loading: false,
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
    builder
      .addCase(globalData.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(globalData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false; // Set loading to false when data fetching is completed
      })
      .addCase(globalData.rejected, (state, action) => {
        state.loading = false;
        // Handle error state if needed
      });
  }
})

export default globalSlice.reducer

export const { handleResetData } = globalSlice.actions