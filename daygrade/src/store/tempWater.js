/* eslint-disable no-fallthrough */
import {
  getDocs,
  addDoc,
  updateDoc,
  doc,
  query,
  collection,
  onSnapshot,
  where,
} from 'firebase/firestore';
import { db } from '../firebase';

const FETCH_WATER = 'FETCH_WATER';

const _getWaterInfo = (info) => {
  return { type: FETCH_WATER, info };
};

export const fetchWaterInfo = (userId, date) => (dispatch) => {
  try {
    const ref = query(
      collection(db, 'WaterCount'),
      where('userId', '==', userId),
      where('date', '==', date)
    );
    const subscriber = onSnapshot(
      ref,
      { includeMetadataChanges: true },
      async (querySnapshot) => {
        const info = querySnapshot.docs.map((cur) => ({
          ...cur.data(),
          id: cur.id,
        }));
        dispatch(_getWaterInfo(info));
      }
    );
    return subscriber;
  } catch (error) {
    console.error(error);
  }
};

let initialState = [];

export default function waterReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_WATER: {
      return action.info;
    }
    default:
      return state;
  }
}
