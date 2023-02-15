import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
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
  const subscriber = onSnapshot(doc(db, 'Users', userId), (docSnapshot) => {
    dispatch(_getUser({ ...docSnapshot.data(), id: docSnapshot.id }));
  });
  return subscriber;
};

export const editUser = (userId, editedInfo) => async (dispatch) => {
  const { firstName, lastName, email, age, userName } = editedInfo;
  const docRef = doc(db, 'Users', userId);
  await updateDoc(docRef, {
    firstName,
    lastName,
    email,
    age,
    userName,
  });
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
