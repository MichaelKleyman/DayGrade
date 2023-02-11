import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  orderBy,
  updateDoc,
  setDoc,
} from 'firebase/firestore';
import { db } from '../firebase.js';

//ACTIONS
const GET_LOG = 'GET_LOG';
const DELETE_LOG = 'DELETE_LOG';

//ACTION CREATORS
const _getLog = (log) => {
  return {
    type: GET_LOG,
    log,
  };
};

//THUNKS
export const fetchLog = (userId, date) => (dispatch) => {
  const ref = query(
    collection(db, 'Logger'),
    where('userId', '==', userId),
    where('Date', '==', date),
    orderBy('createdAt')
  );
  const subscriber = onSnapshot(ref, async (querySnapshot) => {
    const log = querySnapshot.docs.map((curLog) => ({
      ...curLog.data(),
      id: curLog.id,
    }));
    dispatch(_getLog(log));
  });
  return subscriber;
};

export const createLog = (time, date, curLog, userId) => async () => {
  await addDoc(collection(db, 'Logger'), {
    Time: time,
    Date: date,
    log: curLog,
    userId,
    createdAt: serverTimestamp(),
  });
};

export const deleteLog = (logId) => () => {
  deleteDoc(doc(db, 'Logger', logId));
};

export const editLog = (logId, editedLog) => async () => {
  const docRef = doc(db, 'Logger', logId);
  await updateDoc(docRef, {
    log: editedLog,
  });
  //   setDoc(doc(db, 'Logger', logId), { log: editedLog }, { merge: true });
};

//REDUCER
let initialState = [];

export default function logReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LOG: {
      return action.log;
    }
    case DELETE_LOG: {
      return action.log;
    }
    default:
      return state;
  }
}
