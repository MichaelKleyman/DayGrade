import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  getAuth,
} from 'firebase/auth';
import { FaCheck } from 'react-icons/fa';
import { BsDot } from 'react-icons/bs';

const Password = () => {
  const auth = getAuth();
  const userPass = auth.currentUser;
  const [password, setPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [error, setError] = useState(null);
  const [confirm, setConfirm] = useState(false);

  // const handleClose = async (e, closing) => {
  //   if (closing) {
  //     setOldPassword('');
  //     setPassword('');
  //     setError(null);
  //     setConfirm(false);
  //     // return;
  //   }
  // };

  const handleSubmit = async () => {
    const credential = EmailAuthProvider.credential(
      userPass.email,
      oldPassword
    );
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
    }
    if (oldPassword === password) {
      setError('New password cant match the old password');
    } else if (oldPassword !== password && password.length >= 6) {
      reauthenticateWithCredential(userPass, credential)
        .then(() => {
          // User re-authenticated.
          updatePassword(userPass, password);
          // setConfirm(true);
          setOldPassword('');
          setPassword('');
          setConfirm(true);
          setError(null);
          setTimeout(() => {
            setConfirm(false);
          }, 1500);
        })
        .catch((error) => {
          // An error ocurred
          // ...
          setError('Old password is incorrect');
          // alert('Incorrect Password!');
        });
    }
  };

  return (
    <div>
      <label className='p-2 font-bold'>Reset Password</label>
      <div className='p-3'>
        <h1 className='text-sm text-gray-500 flex items-center'>
          <BsDot size={35} /> New password must by at least 6 characters long
        </h1>
        <h1 className='text-sm text-gray-500 flex items-center'>
          <BsDot size={35} /> New password must not match old password
        </h1>
      </div>
      <div className='grid sm:grid-cols-1 md:grid-cols-1 gap-2 w-full md:w-[45%]'>
        <div className='grid grid-cols-1 gap-3 md:gap-0 place-content-center p-6'>
          <TextField
            id='outlined-required'
            label='Old password'
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </div>
        <div className='grid grid-cols-1 gap-3 md:gap-0 place-content-center p-6'>
          <TextField
            id='outlined-required'
            label='New password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          {error ? (
            <p className='text-red-600 text-center pb-3'>{error}</p>
          ) : null}
        </div>
      </div>
      {confirm ? (
        <Button sx={{ color: 'green' }}>
          <FaCheck className='mr-4 p-1' size={35} />
          Successful Reset
        </Button>
      ) : (
        <Button
          disabled={password.length === 0 || oldPassword.length === 0}
          onClick={() => handleSubmit()}
          sx={{ backgroundColor: 'green', color: 'white' }}
        >
          Submit
        </Button>
      )}
    </div>
  );
};

export default Password;
