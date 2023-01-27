import logger from 'redux-logger';
import { configureStore } from '@reduxjs/toolkit';

import loggedInUserReducer from './user';

const store = configureStore({
  reducer: {
    loggedInUser: loggedInUserReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from './user';
