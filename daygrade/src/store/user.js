import {
  doc,
  onSnapshot,
  updateDoc,
  query,
  where,
  collection,
  deleteDoc,
  getDoc,
  getDocs,
} from 'firebase/firestore';
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

export const deleteUserAccount = (userId, id) => async () => {
  //delete user
  try {
    // const user = query(collection(db, 'Users'), where('userId', '==', userId));
    // const docSnap = await getDoc(user);
    // await deleteDoc(doc(docSnap));
    deleteDoc(doc(db, 'Users', id));

    //delete all users logs
    const logs = query(collection(db, 'Logger'), where('userId', '==', userId));
    const logDocs = await getDocs(logs);
    await Promise.all(logDocs.docs.map((log) => deleteDoc(log.ref)));

    //delete all users scores
    const scores = query(
      collection(db, 'FinalScore'),
      where('userId', '==', userId)
    );
    const scoreDocs = await getDocs(scores);
    await Promise.all(scoreDocs.docs.map((score) => deleteDoc(score.ref)));

    //delete all users water count
    const waterCount = query(
      collection(db, 'WaterCount'),
      where('userId', '==', userId)
    );
    const waterDocs = await getDocs(waterCount);
    await Promise.all(waterDocs.docs.map((count) => deleteDoc(count.ref)));
  } catch (error) {
    console.log('ERROR', error);
  }
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
