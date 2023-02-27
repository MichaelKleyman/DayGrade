import {
  where,
  onSnapshot,
  collection,
  query,
  doc,
  updateDoc,
  addDoc,
} from 'firebase/firestore';
import { db } from '../firebase';

//ACTION
const GET_WATER = 'GET_WATER';
const EDIT_WATER = 'EDIT_WATER';

//ACTION CREATOR
const _getWater = (info) => {
  return {
    type: GET_WATER,
    info,
  };
};

const _editWater = (info) => {
  return {
    type: EDIT_WATER,
    info,
  };
};

//THUNK
export const fetchWaterInfo = (userId, date) => (dispatch) => {
  const ref = query(
    collection(db, 'WaterCount'),
    where('userId', '==', userId),
    where('date', '==', date)
  );
  const subscriber = onSnapshot(ref, async (querySnapshot) => {
    const count = querySnapshot.docs.map((curCount) => ({
      ...curCount.data(),
      id: curCount.id,
    }));
    dispatch(_getWater(count));
  });
  return subscriber;
};

export const editWaterCount =
  (userId, editedCount, type, date) => async (dispatch) => {
    // const docRef = doc(db, 'WaterCount', waterId);
    const docRef = query(
      collection(db, 'WaterCount'),
      where('userId', '==', userId),
      where('date', '==', date)
    );
    const doc = await updateDoc(docRef, {
      drank: editedCount,
      type,
    });
    dispatch(_editWater(doc));
  };

export const createWaterCount = (userId, date, type, drank) => async () => {
  await addDoc(collection(db, 'WaterCount'), {
    userId,
    drank,
    type,
    date,
  });
};

//REDUCER
let initialState = [];

export default function waterReducer(state = initialState, action) {
  switch (action.type) {
    case GET_WATER: {
      return action.info;
    }
    case EDIT_WATER: {
      return action.info;
    }
    default:
      return state;
  }
}
