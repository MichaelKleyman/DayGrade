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
import { createReducer } from '@reduxjs/toolkit';

const FETCH_WATER = 'FETCH_WATER';
const FETCH_NEW_WATER = 'FETCH_NEW_WATER';
const FETCH_WATER_ERROR = 'FETCH_WATER_ERROR';
// const UPDATE_WATER = 'UPDATE_WATER';

const _getWaterInfo = (info) => ({ type: FETCH_WATER, info });
const _getNewWaterInfo = (info) => ({ type: FETCH_NEW_WATER, info });
const fetchWaterInfoError = (error) => ({ type: FETCH_WATER_ERROR, error });
// export const _updateWater = (info) => ({ type: UPDATE_WATER, info });

export const fetchWaterInfo = (userId, date) => async (dispatch) => {
  try {
    const ref = query(
      collection(db, 'WaterCount'),
      where('userId', '==', userId),
      where('date', '==', date)
    );
    const querySnapshot = await getDocs(ref);
    const info = querySnapshot.docs.map((cur) => ({
      ...cur.data(),
      id: cur.id,
    }));
    const obj = info[0];
    dispatch(_getWaterInfo(obj));
  } catch (error) {
    dispatch(fetchWaterInfoError(error));
  }
};

export const fetchNewWaterInfo = (userId) => async (dispatch) => {
  try {
    const ref = query(
      collection(db, 'WaterCount'),
      where('userId', '==', userId)
    );
    const querySnapshot = await getDocs(ref);
    const info = querySnapshot.docs.map((cur) => ({
      ...cur.data(),
      id: cur.id,
    }));
    const obj = info[0];
    dispatch(_getNewWaterInfo(obj));
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
        console.log('>>>', action.info);
        return null;
      } else {
        console.log('>>>', action.info);
        console.log('>>>', state);
        // return { ...state, ...action.info };
        return action.info;
      }
    }
    case FETCH_WATER_ERROR: {
      return { error: action.error };
    }
    case FETCH_NEW_WATER: {
      return { ...action.info };
    }
    default:
      return state;
  }
}
// export const waterReducer = createReducer(initialState, {
//   FETCH_WATER: (state, action) => {
//     if (action.info === undefined) {
//       return null;
//     } else {
//       state = action.info;
//       return { ...state };
//     }
//   },
//   FETCH_WATER_ERROR: (state, action) => {
//     state = { error: action.error };
//     return { ...state };
//   },
// });

// const ref = query(
//   collection(db, 'WaterCount'),
//   where('userId', '==', userId),
//   where('date', '==', date)
// );
// const subscriber = onSnapshot(ref, (querySnapshot) => {
//   const info = querySnapshot.docs.map((cur) => ({
//     ...cur.data(),
//     id: cur.id,
//   }));
//   let obj = info[0];
//   dispatch(_getWaterInfo(obj));
// });
// return subscriber;
