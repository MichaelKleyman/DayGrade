import { query, collection, where, orderBy } from 'firebase/firestore';
import { db } from '../firebase';

//ACTIONS
const DATE_SCORES = 'DATE_SCORES';

//ACTION CREATORS
const _getScores = (info) => {
  return {
    type: DATE_SCORES,
    info,
  };
};

//THUNKS
export const fetchSpecificScores = (startDate, userId) => async (dispatch) => {
  let dt = new Date(startDate);
  let lastday = dt.getDate() - (dt.getDay() - 1) + 6;
  const ref = query(
    collection(db, 'FinalScore'),
    where('userId', '==', userId),
    where('createdAt')
    orderBy('createdAt')
  );
};

//REDUCER
