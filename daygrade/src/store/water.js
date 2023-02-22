import { collection, onSnapshot, where, query } from 'firebase/firestore';
import { db } from '../firebase';

//ACTIONS
const FETCH_WATER = 'FETCH_WATER';

//ACTION CREATORS
const _fetchWater = (info) => {
  return {
    type: FETCH_WATER,
    info,
  };
};

//THUNKS
export const fetchWater = (userId, date) => async (dispatch) => {
  const ref = query(
    collection(db, 'FinalScore'),
    where('userId', '==', userId),
    where('date', '==', date)
  );
  const subscriber = onSnapshot(ref, async (querySnapshot) => {
    const log = querySnapshot.docs.map((curScore) => ({
      ...curScore.data(),
      id: curScore.id,
    }));
    // console.log(log);
    dispatch(_fetchWater(log[0]));
  });
  return subscriber;
};

//REDUCER
const initialState = {};

export default function waterReducer(state = initialState, action) {
  switch (action) {
    case FETCH_WATER:
      return action.info;
    default:
      return state;
  }
}
