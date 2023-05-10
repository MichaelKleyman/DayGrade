import { query, collection, onSnapshot, where } from 'firebase/firestore';
import { db } from '../firebase';
const FETCH_ALL_WATER = 'FETCH_ALL_WATER';

const _getAllWaterInfo = (info) => {
  return { type: FETCH_ALL_WATER, info };
};
export const fetchAverageWater = (userId) => (dispatch) => {
  try {
    const ref = query(
      collection(db, 'WaterCount'),
      where('userId', '==', userId)
    );
    const subscriber = onSnapshot(
      ref,
      { includeMetadataChanges: true },
      async (querySnapshot) => {
        const info = querySnapshot.docs.map((cur) => ({
          ...cur.data(),
          id: cur.id,
        }));

        dispatch(_getAllWaterInfo(info));
      }
    );
    return subscriber;
  } catch (error) {
    console.error(error);
  }
};
let initialState = [];

export default function averageWaterReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ALL_WATER: {
      return action.info;
    }
    default:
      return state;
  }
}
