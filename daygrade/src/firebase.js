import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Replace the following with your app's Firebase project configuration
//find configuration in firebase, settings, register the web app
const firebaseConfig = {
  apiKey: 'AIzaSyAOZM9us5Hmd567bEbAZXsaTtUvgQMDYvY',
  authDomain: 'daygrade-e0823.firebaseapp.com',
  projectId: 'daygrade-e0823',
  storageBucket: 'daygrade-e0823.appspot.com',
  messagingSenderId: '760778943147',
  appId: '1:760778943147:web:700ddb8106e658d80f25ee',
  measurementId: 'G-11N0CTQYPK',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

//allows us to access our database from these modules anywhere throughout the project.


// export const createUserDocument = async (user, additionalData) => {
//   if (!user) return;

//   const userRef = doc(`Users/${user.uid}`);
//   const snapshot = await userRef.get();

//   if (!snapshot.exists()) {
//     const { email } = user;
//     const { firstName, lastName, userName, age, goals } = additionalData;

//     try {
//       userRef.setDoc({
//         firstName,
//         lastName,
//         userName,
//         age,
//         goals,
//         email,
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   }
// };