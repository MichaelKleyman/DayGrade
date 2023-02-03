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
} from 'firebase/firestore';
import { db } from '../firebase.js';

//ACTIONS
const GET_LOG = 'GET_LOG';
const CREATE_LOG = 'CREATE_LOG';
const DELETE_LOG = 'DELETE_LOG';

//ACTION CREATORS
const _getLog = (log) => {
  return {
    type: GET_LOG,
    log,
  };
};

// const _createLog = (log) => {
//   return {
//     type: CREATE_LOG,
//     log,
//   };
// };

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

export const createLog = (time, date, curLog, userId) => async (dispatch) => {
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
