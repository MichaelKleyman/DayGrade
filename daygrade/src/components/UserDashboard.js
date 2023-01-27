/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from 'react';
import { useAuth } from '../context/Authcontext';
import { fetchUser } from '../store';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

const UserDashboard = () => {
  const { currentUser } = useAuth();
  const [user, loading] = useAuthState(auth);

  //   useEffect(() => {
  //     const unsubscribeUser = dispatch(fetchUser(user?.uid));
  //     return () => {
  //       unsubscribeUser();
  //     };
  //   }, [user, dispatch]);

  return (
    <div>
      <div>Hello </div>
      <button onClick={() => console.log(user)}>+</button>
    </div>
  );
};

export default UserDashboard;
