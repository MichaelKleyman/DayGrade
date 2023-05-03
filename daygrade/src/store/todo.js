import {
  query,
  collection,
  where,
  onSnapshot,
  addDoc,
  serverTimestamp,
  orderBy,
  doc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import { db } from '../firebase';

//ACTIONS
const FETCH_TODOS = 'FETCH_TODOS';
const FETCH_SPECIFIC_TODOS = 'FETCH_SPECIFIC_TODOS';

//ACTION CREATORS
const _fetchTodos = (todos) => ({ type: FETCH_TODOS, todos });
const _fetchSpecificTodos = (todos) => ({ type: FETCH_SPECIFIC_TODOS, todos });

//THUNKS
export const fetchTodos = (userId) => (dispatch) => {
  const ref = query(
    collection(db, 'To-Do'),
    where('userId', '==', userId),
    orderBy('createdAt')
  );
  const subscriber = onSnapshot(ref, async (querySnapshot) => {
    const log = querySnapshot.docs.map((curLog) => ({
      ...curLog.data(),
      id: curLog.id,
    }));
    dispatch(_fetchTodos(log));
  });
  return subscriber;
};

export const fetchSpecificTodos = (userId, date) => (dispatch) => {
  const ref = query(
    collection(db, 'To-Do'),
    where('userId', '==', userId),
    where('date', '==', date),
    orderBy('createdAt')
  );
  const subscriber = onSnapshot(ref, async (querySnapshot) => {
    const log = querySnapshot.docs.map((curLog) => ({
      ...curLog.data(),
      id: curLog.id,
    }));
    dispatch(_fetchSpecificTodos(log));
  });
  return subscriber;
};

export const deleteOldTodos = (todos) => async () => {
  todos.forEach((todo) => {
    let todaysDate = new Date().toString().split(' ').splice(1, 3).join(' ');
    let objDate = new Date(todo.date)
      .toString()
      .split(' ')
      .splice(1, 3)
      .join(' ');
    if (objDate !== todaysDate) {
      deleteDoc(doc(db, 'To-Do', todo.id));
    }
  });
};

export const addTodo = (todo, date, userId, check) => async () => {
  //   console.log({ todo, date, userId });
  try {
    await addDoc(collection(db, 'To-Do'), {
      todo,
      date,
      userId,
      completed: check,
      createdAt: serverTimestamp(),
    });
    console.log('added');
  } catch (error) {
    console.error(error);
  }
};

export const toggleCheck = (id, bool) => async () => {
  const docRef = doc(db, 'To-Do', id);
  await updateDoc(docRef, {
    completed: bool,
  });
};

export const deleteToDo = (id) => () => {
  deleteDoc(doc(db, 'To-Do', id));
};

//REDUCER
const initialState = [];

export default function todosReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_TODOS: {
      return action.todos;
    }
    case FETCH_SPECIFIC_TODOS: {
      return action.todos;
    }
    default:
      return state;
  }
}
