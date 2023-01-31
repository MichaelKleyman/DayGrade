import logger from 'redux-logger';
import { configureStore } from '@reduxjs/toolkit';

import loggedInUserReducer from './user';
import userGoals from './goals';

const store = configureStore({
  reducer: {
    loggedInUser: loggedInUserReducer,
    userGoals,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(logger),
});

export default store;
export * from './user';
export * from './goals';
