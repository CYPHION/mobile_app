import { createSlice } from '@reduxjs/toolkit';
import { globalData } from '../thunk/index';
// Initial state of the global slice
const initialState = {
  data: {},// Placeholder for global data
  loading: false,// Indicates whether data is being fetched/loading
}

// Creating a Redux slice for managing global data
export const globalSlice = createSlice({
  name: 'global',// Slice name
  initialState: initialState,// Initial state
  reducers: {
    // Reducer function to reset data to initial state
    handleResetData: (state, action) => {
      state.data = initialState.data; // Reset data to initial state
      // AsyncStorage.removeItem('userData');
    },
  },
  extraReducers: builder => {
    // Handling extra reducers for asynchronous data fetching
    builder
      .addCase(globalData.pending, (state, action) => {
        state.loading = true; // Set loading state when data fetching starts
      })
      .addCase(globalData.fulfilled, (state, action) => {
        state.data = action.payload; // Update data with fetched payload
        state.loading = false; // Set loading to false when data fetching is completed
      })
      .addCase(globalData.rejected, (state, action) => {
        state.loading = false; // Set loading to false if data fetching is rejected
        // Handle error state if needed
      });
  }
})
// Exporting the reducer function generated by the slice
export default globalSlice.reducer

// Exporting the action creator functions generated by the slice
export const { handleResetData } = globalSlice.actions