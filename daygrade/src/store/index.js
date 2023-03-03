import logger from 'redux-logger';
import { configureStore } from '@reduxjs/toolkit';
import loggedInUserReducer from './user';
import userGoals from './goals';
import logReducer from './logger';
import scoreReducer from './dailyScore';
import specificScoreReducer from './chartDateFilter';
import waterReducer from './water';
import waterReducer2 from './tempWater';
import todosReducer from './todo';

const store = configureStore({
  reducer: {
    loggedInUser: loggedInUserReducer,
    userGoals,
    logReducer,
    scoreReducer,
    specificScoreReducer,
    waterReducer2,
    todosReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
      //fixed the bug about
    }).concat(logger),
});

export default store;
export * from './user';
export * from './goals';
export * from './logger';
export * from './dailyScore';
export * from './chartDateFilter';
// export * from './water';
export * from './tempWater';
export * from './todo';
