import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser } from '../store';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { HiUser } from 'react-icons/hi';
import { FaLock } from 'react-icons/fa';
import { RiSettings5Fill } from 'react-icons/ri';
import Button from '@mui/material/Button';
import Account from './Account';
import Password from './Password';
import Settings from './Settings';

const UsersAccount = () => {
  const [page, setPage] = useState('Account');
  const [user, loading] = useAuthState(auth);

  const pageNames = ['Account', 'Password', 'Settings'];

  const dispatch = useDispatch();
  const userObject = useSelector((state) => state.loggedInUser);

  useEffect(() => {
    const unsubscribeUser = dispatch(fetchUser(user.uid));
    return () => {
      unsubscribeUser();
    };
  }, []);

  const pageDisplay = () => {
    if (page === 'Password') {
      return <Password />;
    } else if (page === 'Settings') {
      return <Settings />;
    } else {
      return <Account userObject={userObject} />;
    }
  };

  return (
    <div className='w-full'>
      <div className='flex items-center justify-start py-6 ml-3'>
        <Button
          onClick={() => {
            setPage(pageNames[0]);
          }}
          sx={{
            backgroundColor: `${page === 'Account' ? '#D3D3D3' : ''}`,
            color: `${page === 'Account' ? 'white' : ''}`,
          }}
          className='p-4 uppercase tracking-wide cursor-pointer m-3 hover:text-white'
        >
          <HiUser className='p-3' size={45} />
          Account
        </Button>
        <Button
          sx={{
            backgroundColor: `${page === 'Password' ? '#D3D3D3' : ''}`,
            color: `${page === 'Password' ? 'white' : ''}`,
          }}
          onClick={() => {
            setPage(pageNames[1]);
          }}
          className='p-4 uppercase tracking-wide cursor-pointer m-3 hover:text-white'
        >
          <FaLock className='p-3' size={40} />
          Password
        </Button>
        <Button
          sx={{
            backgroundColor: `${page === 'Settings' ? '#D3D3D3' : ''}`,
            color: `${page === 'Settings' ? 'white' : ''}`,
          }}
          onClick={() => {
            setPage(pageNames[2]);
          }}
          className='p-4 uppercase tracking-wide cursor-pointer m-3 hover:text-white'
        >
          <RiSettings5Fill className='p-3' size={45} />
          Settings
        </Button>
      </div>
      <div className='w-[85%] bg-stone-100 shadow-lg shadow-gray-400 rounded-lg m-6 p-3'>
        <div>{pageDisplay()}</div>
      </div>
    </div>
  );
};

export default UsersAccount;
