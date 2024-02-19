// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit';

// ** Reducers
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore } from 'redux-persist';
import global from './slice/global';
import user from './slice/user';


const userConfig = {
  key: 'user',
  storage: AsyncStorage
}


export const store = configureStore({
  reducer: {
    user: persistReducer(userConfig, user),
    global: global,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    })
})

// Create the persistor
export const persistor = persistStore(store);
