// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit';

// ** Reducers
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore } from 'redux-persist';
import global from './slice/global';
import user from './slice/user';

// Configuration for persisting user slice state using AsyncStorage
const userConfig = {
  key: 'user', // Key under which user slice state will be stored
  storage: AsyncStorage // Storage mechanism for persisting state
}

// Configure the Redux store with reducers and middleware
export const store = configureStore({
  reducer: {
    // Configure persistReducer for user slice to enable state persistence
    user: persistReducer(userConfig, user),
    global: global, // Add global slice reducer without state persistence
  },
  // Customize middleware, disabling serializable and immutable state checks for better performance
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,// Disable serializable state check for non-serializable data
      immutableCheck: false,// Disable immutable state check for better performance
    })
})

// Create the Redux persistor, which allows the application to rehydrate state from storage
export const persistor = persistStore(store);
