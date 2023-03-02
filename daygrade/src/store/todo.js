import {
  query,
  collection,
  where,
  onSnapshot,
  addDoc,
  doc,
} from 'firebase/firestore';
import { db } from '../firebase';

//ACTIONS
const FETCH_TODOS = 'FETCH_TODOS';

//ACTION CREATORS
const _fetchTodos = (todos) => ({ type: FETCH_TODOS, todos });

//THUNKS
export const fetchTodos = (userId) => (dispatch) => {
  const ref = query(collection(db, 'To-Do'), where('userId', '==', userId));
  const subscriber = onSnapshot(ref, async (querySnapshot) => {
    const log = querySnapshot.docs.map((curLog) => ({
      ...curLog.data(),
      id: curLog.id,
    }));
    dispatch(_fetchTodos(log));
  });
  return subscriber;
};

export const addTodo = (todo, date, userId) => async () => {
  //   console.log({ todo, date, userId });
  try {
    await addDoc(collection(db, 'To-Do'), {
      todo,
      date,
      userId,
    });
    console.log('added');
  } catch (error) {
    console.error(error);
  }
};

//REDUCER
const initialState = [];

export default function todosReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_TODOS: {
      return action.todos;
    }
    default:
      return state;
  }
}
