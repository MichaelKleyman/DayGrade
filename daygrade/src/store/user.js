import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

//ACTIONS
const GET_USER = 'GET_USER';

//ACTION CREATORS
const _getUser = (user) => {
  return {
    type: GET_USER,
    user,
  };
};

//THUNKS
export const fetchUser = (userId) => (dispatch) => {
  console.log(userId);
  const subscriber = onSnapshot(doc(db, 'Users', userId), (docSnapshot) => {
    dispatch(_getUser({ ...docSnapshot.data(), id: docSnapshot.id }));
  });
  return subscriber;
};

//REDUCER
const initialState = {};

export default function loggedInUserReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER: {
      return action.user;
    }
    default:
      return state;
  }
}
