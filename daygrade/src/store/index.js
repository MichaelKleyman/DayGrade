import logger from 'redux-logger';
import { configureStore } from '@reduxjs/toolkit';
import loggedInUserReducer from './user';
import userGoals from './goals';
import logReducer from './logger';
import scoreReducer from './dailyScore';
import specificScoreReducer from './chartDateFilter';

const store = configureStore({
  reducer: {
    loggedInUser: loggedInUserReducer,
    userGoals,
    logReducer,
    scoreReducer,
    specificScoreReducer,
  
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(logger),
});

export default store;
export * from './user';
export * from './goals';
export * from './logger';
export * from './dailyScore';
export * from './chartDateFilter';
