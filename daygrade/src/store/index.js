import logger from 'redux-logger';
import { configureStore } from '@reduxjs/toolkit';
import loggedInUserReducer from './user';
import userGoals from './goals';
import logReducer from './logger';
import scoreReducer from './dailyScore';
import specificScoreReducer from './chartDateFilter';
import waterReducer from './water';
import todosReducer from './todo';
import averageWaterReducer from './averageWater';

const store = configureStore({
  reducer: {
    loggedInUser: loggedInUserReducer,
    userGoals,
    logReducer,
    scoreReducer,
    specificScoreReducer,
    waterReducer,
    todosReducer,
    averageWaterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
      devTools: true,
      //fixed the bug about
    }), //can do .concat(logger) if you want to see redux-logs
});

export default store;
export * from './user';
export * from './goals';
export * from './logger';
export * from './dailyScore';
export * from './chartDateFilter';
export * from './water';
export * from './todo';
export * from './averageWater';
