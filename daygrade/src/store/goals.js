import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { query, collection, where } from 'firebase/firestore';

//ACTIONS
const FETCH_GOALS = 'FETCH_GOALS';

//ACTION CREATORS
const _fetchGoals = (goals) => {
  return {
    type: FETCH_GOALS,
    goals,
  };
};

//THUNKS
export const fetchUserGoals = (email) => (dispatch) => {
  const goals = query(collection(db, 'Users'), where('email', '==', email));
  const subscriber = onSnapshot(goals, (querySnapshot) => {
    const userGoals = querySnapshot.docs.map((goal) => ({
      ...goal.data(),
    }));
    dispatch(_fetchGoals(userGoals));
  });
  return subscriber;
};

//REDUCER
const initialState = [];

export default function userGoals(state = initialState, action) {
  switch (action.type) {
    case FETCH_GOALS:
      return action.goals;
    default:
      return state;
  }
}
