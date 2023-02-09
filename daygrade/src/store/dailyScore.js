import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

//THUNK
export const submitCheckIn =
  (userId, score, description, emoji, reasons, finalNotes) => async () => {
    await addDoc(collection(db, 'FinalScore'), {
      userId,
      score,
      description,
      emoji,
      reasons,
      finalNotes,
      createdAt: serverTimestamp(),
    });
  };

//REDUCER

