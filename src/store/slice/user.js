import AsyncStorage from '@react-native-async-storage/async-storage';
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
      AsyncStorage.setItem('userData', JSON.stringify(action.payload));
    },
    handleLogout: (state, action) => {
      state.data = initialState.data;
      AsyncStorage.removeItem('userData');
    },
  },
  extraReducers: builder => {
    builder.addCase(logoutUser.fulfilled, (state, _action) => {
      state.data = initialState.data;
      AsyncStorage.removeItem('userData');
    })
  }
})

export const { handleLogin, handleLogout } = appUsersSlice.actions;

export default appUsersSlice.reducer
