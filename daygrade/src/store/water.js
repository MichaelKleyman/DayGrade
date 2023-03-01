/* eslint-disable no-fallthrough */
import {
  getDoc,
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
const FETCH_WATER_ERROR = 'FETCH_WATER_ERROR';
// const UPDATE_WATER = 'UPDATE_WATER';

const _getWaterInfo = (info) => ({ type: FETCH_WATER, info });
const fetchWaterInfoError = (error) => ({ type: FETCH_WATER_ERROR, error });
// export const _updateWater = (info) => ({ type: UPDATE_WATER, info });

export const fetchWaterInfo = (userId, date) => async (dispatch) => {
  try {
    const ref = query(
      collection(db, 'WaterCount'),
      where('userId', '==', userId),
      where('date', '==', date)
    );
    const subscriber = onSnapshot(ref, (querySnapshot) => {
      const info = querySnapshot.docs.map((cur) => ({
        ...cur.data(),
        id: cur.id,
      }));
      let obj = info[0];
      dispatch(_getWaterInfo(obj));
    });
    return subscriber;
  } catch (error) {
    dispatch(fetchWaterInfoError(error));
  }
};

// export const updateWaterInfo = (id, drank, type) => async (dispatch) => {
//   const docRef = doc(db, 'WaterCount', id);
//   await updateDoc(docRef, {
//     drank,
//     type,
//   });
//   const currentDoc = await getDoc(doc(db, 'WaterCount', id));
//   const obj = currentDoc.data();
//   dispatch(_getWaterInfo(obj));
// };

// export const addWaterInfo = (userId, drank, type, date) => async (dispatch) => {
//   await addDoc(collection(db, 'WaterCount'), {
//     type,
//     drank,
//     userId,
//     date,
//   });
// };

let initialState = {};

export default function waterReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_WATER: {
      if (action.info === undefined) {
        return null;
      } else {
        state = action.info;
        return state;
      }
    }
    case FETCH_WATER_ERROR: {
      return { error: action.error };
    }
    // case UPDATE_WATER: {
    //   if (state.id === action.info.id) {
    //     return { ...action.info };
    //   }
    // }
    default:
      return state;
  }
}

// const ref = query(
//   collection(db, 'WaterCount'),
//   where('userId', '==', userId),
//   where('date', '==', date)
// );
// const querySnapshot = await getDocs(ref);
// const info = querySnapshot.docs.map((cur) => ({
//   ...cur.data(),
//   id: cur.id,
// }));
// const obj = info[0];
// dispatch(_getWaterInfo(obj));
