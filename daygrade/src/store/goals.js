import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { query, collection, where } from 'firebase/firestore';

//ACTIONS
const EDIT_GOALS = 'EDIT_GOALS';

//ACTION CREATORS
export const _editGoals = (goals) => {
  return {
    type: EDIT_GOALS,
    goals,
  };
};

//THUNKS

//REDUCER
const initialState = [];

export default function userGoals(state = initialState, action) {
  switch (action.type) {
    case EDIT_GOALS:
      return state.map((user) => {
        if (user.id === action.user.id) {
          return { ...user, ...action.goals };
        } else return user;
      });
    default:
      return state;
  }
}
