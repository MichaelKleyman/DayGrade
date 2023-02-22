import {
  addDoc,
  collection,
  serverTimestamp,
  query,
  where,
  onSnapshot,
  deleteDoc,
  doc,
  orderBy,
} from 'firebase/firestore';
import { db } from '../firebase';

//ACTIONS
const GET_SCORE_INFO = 'GET_SCORE_INFO';
const GET_ALL_SCORES = 'GET_ALL_SCORES';

//ACTION CREATOR
const _getScoreInfo = (info) => {
  return {
    type: GET_SCORE_INFO,
    info,
  };
};

const _getAllScores = (scores) => {
  return {
    type: GET_ALL_SCORES,
    scores,
  };
};

//THUNK
export const fetchScoreInfo = (userId, date) => (dispatch) => {
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
    dispatch(_getScoreInfo(log));
  });
  return subscriber;
};

export const fetchAllScores = (userId) => (dispatch) => {
  const ref = query(
    collection(db, 'FinalScore'),
    where('userId', '==', userId),
    orderBy('createdAt')
  );
  const subscriber = onSnapshot(ref, async (querySnapshot) => {
    const scores = querySnapshot.docs.map((curScore) => ({
      ...curScore.data(),
      id: curScore.id,
    }));
    dispatch(_getAllScores(scores));
  });
  return subscriber;
};

export const submitCheckIn =
  (userId, score, description, emoji, reasons, finalNotes, date, waterCount) =>
  async () => {
    await addDoc(collection(db, 'FinalScore'), {
      userId,
      score,
      description,
      emoji,
      reasons,
      finalNotes,
      waterCount,
      createdAt: serverTimestamp(),
      date,
    });
  };

export const deleteCheckIn = (id) => () => {
  deleteDoc(doc(db, 'FinalScore', id));
};

//REDUCER
const initialState = [];

export default function scoreReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SCORE_INFO: {
      return action.info;
    }
    case GET_ALL_SCORES: {
      return action.scores;
    }
    default:
      return state;
  }
}
