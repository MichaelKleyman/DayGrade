import React, { useState, useEffect, useContext, useRef } from 'react';
import { auth, db, createUserDocument } from '../firebase';
//these functions are imported from firebase authentication
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from 'firebase/auth';
//imported from firebase/firestore
import { doc, getDoc } from 'firebase/firestore';
//onAuthStateChanged method is an observer which is attatched to this global authentication object, and it gets called
//whenever the users sign-in state changes. Gives information about the user basically, only if a user is successfully signed in.

//this all is a global wrapper for our application which will allow
// any page to access the authentication information of the user

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}
//this function ^^ is what allows us to access that context information anywhere

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const userInfo = useRef();

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
