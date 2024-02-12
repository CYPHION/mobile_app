// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit';

// ** Reducers
import global from './slice/global';
import user from './slice/user';



export const store = configureStore({
  reducer: {
    user: user,
    global: global,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

// Create the persistor
// export const persistor = persistStore(store);
