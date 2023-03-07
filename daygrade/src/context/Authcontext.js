import React, { useState, useEffect, useContext, useRef } from 'react';
import { auth, db, createUserDocument } from '../firebase';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
//these functions are imported from firebase authentication
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile,
} from 'firebase/auth';
//imported from firebase/firestore
//onAuthStateChanged method is an observer which is attatched to this global authentication object, and it gets called
//whenever the users sign-in state changes. Gives information about the user basically, only if a user is successfully signed in.

//this all is a global wrapper for our application which will allow
// any page to access the authentication information of the user

const AuthContext = React.createContext();
const storage = getStorage();

export function useAuth() {
  return useContext(AuthContext);
}
//this function ^^ is what allows us to access that context information anywhere

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const userInfo = useRef();

  //storage functions
  async function upload(file, currentUser, setLoading) {
    //setLoading is the loading state i'm bringing in which will run while the async operation is being ran.
    //putting the image in the images directory, not root directory
    const fileRef = ref(storage, 'src/images/' + currentUser.uid + '.png'); //this is how you make a reference to a file inside of a firebase storage database. Takes in storage handle as ita first arguement, filelocation(can be anything like image.png, its the location of the file we're getting the reference of)
    //In this case we need to generate a unique filename for each user because everyone will upload their own profile pictures with unique filenames. We'll use currentUser.uid plus concatentating .png
    setLoading(true);
    const snapshot = await uploadBytes(fileRef, file); //tells you where should firebase put this file reference, and also takes the file itself.

    const photoURL = await getDownloadURL(fileRef); //import from firebase/storage which allows you too get the new photo url that will be passed to updateProfile
    //pass in file reference where we get the download url from.

    updateProfile(currentUser, { photoURL }); //imported from firebase authentication
    //pass in the user whos profile we want to edit, then pass an object containing the photoURL

    setLoading(false);
    alert('Uploaded picture');
  }

  async function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth);
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  // function updatePassword(password) {
  //   return updatePassword(auth, password);
  // }

  //can make functions to update password in this as well.

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []); //runs on page load, its a listener that listens too the authentication state.

  const value = {
    currentUser,
    login,
    signUp,
    logout,
    resetPassword,
    upload,
    // updatePassword,
    userInfo,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
  //wrap this whole AuthContext as a wrapper for this application, so wrap it in the index.js file which holds the entire app.
}
