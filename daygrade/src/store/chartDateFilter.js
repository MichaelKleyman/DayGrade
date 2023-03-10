import {
  query,
  collection,
  where,
  orderBy,
  onSnapshot,
} from 'firebase/firestore';
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
export const fetchSpecificScores =
  (startDate, endDate, userId) => async (dispatch) => {
    const ref = query(
      collection(db, 'FinalScore'),
      where('userId', '==', userId),
      orderBy('date')
    );
    const subscriber = onSnapshot(ref, async (querySnapshot) => {
      const log = querySnapshot.docs.map((curScore) => ({
        ...curScore.data(),
        id: curScore.id,
      }));
      let dates = log.filter((obj) => {
        let curDate = new Date(obj.date).getTime();
        startDate = new Date(startDate).getTime();
        endDate = new Date(endDate).getTime();
        if (curDate >= startDate && curDate <= endDate) {
          return obj;
        }
      });

      dates.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );

      dispatch(_getScores(dates));
    });
    return subscriber;
  };

//REDUCER
const initialState = [];

export default function specificScoreReducer(state = initialState, action) {
  switch (action.type) {
    case DATE_SCORES:
      return action.info;
    default:
      return state;
  }
}
