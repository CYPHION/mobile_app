import { createSlice } from '@reduxjs/toolkit';
import { logoutUser } from '../thunk';


const initialState = {
  data: {}
}

export const appUsersSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    handleLogin: (state, action) => {
      state.data = action.payload
    },
    handleLogout: (state, action) => {
      state.data = initialState.data;
    }
  },
  extraReducers: builder => {
    builder.addCase(logoutUser.fulfilled, (state, _action) => {
      state.data = initialState.data;
    })
  }
})

export const { handleLogin, handleLogout } = appUsersSlice.actions;

export default appUsersSlice.reducer
