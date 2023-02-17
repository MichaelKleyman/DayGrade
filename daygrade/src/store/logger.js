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
  getDocs,
} from 'firebase/firestore';
import { db } from '../firebase.js';

//ACTIONS
const GET_LOG = 'GET_LOG';
const DELETE_LOG = 'DELETE_LOG';
const SEARCH_LOGS = 'SEARCH_LOGS';

//ACTION CREATORS
const _getLog = (log) => {
  return {
    type: GET_LOG,
    log,
  };
};

const _searchLogs = (logs) => {
  return {
    type: SEARCH_LOGS,
    logs,
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

export const searchLogs = (info) => async (dispatch) => {
  // const ref = query(
  //   collection(db, 'Logger'),
  //   where('userId', '==', userId),
  //   where('log', '==', searchInput)
  // );
  // const subscriber = onSnapshot(ref, (querySnapshot) => {
  //   const log = querySnapshot.docs.map((curLog) => ({
  //     ...curLog.data(),
  //     id: curLog.id,
  //   }));
  //   dispatch(_searchLogs(log));
  // });
  // return subscriber;
  console.log(info);
  const q = query(
    collection(db, 'Logger'),
    where('userId', '==', info.id),
    where('log', '==', info.input)
  );

  const querySnapshot = await getDocs(q);
  let arr = [];
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    arr.push(doc.data());
  });
  dispatch(_searchLogs(arr));
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
    case SEARCH_LOGS: {
      return action.logs;
    }
    default:
      return state;
  }
}
