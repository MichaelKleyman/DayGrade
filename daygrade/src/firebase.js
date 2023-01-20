import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Replace the following with your app's Firebase project configuration
//find configuration in firebase, settings, register the web app
const firebaseConfig = {
  apiKey: process.env.PUBLIC_APIKEY,
  authDomain: process.env.PUBLIC_AUTHDOMAIN,
  projectId: process.env.PUBLIC_PROJECTID,
  storageBucket: process.env.PUBLIC_STORAGEBUCKET,
  messagingSenderId: process.env.PUBLIC_MESSAGINGSENDERID,
  appId: process.env.PUBLIC_APPID,
  measurementId: process.env.PUBLIC_MEASUREMENTID,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const database = getFirestore(app);
//allows us to access our database from these modules anywhere throughout the project.
