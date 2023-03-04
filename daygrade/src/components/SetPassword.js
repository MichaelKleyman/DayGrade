import React from 'react';
import TextField from '@mui/material/TextField';

const SetPassword = ({
  passwordError,
  setPasswordError,
  confirmedPasswordError,
  setConfirmedPasswordError,
  password,
  setPassword,
  confirmedPassword,
  setConfirmedPassword,
}) => {

  return (
    <div>
      <h2 id='signup-password' className='text-3xl font-bold text-center py-4'>
        Final step! Set your password.
      </h2>
      <p className='text-sm text-gray-400 text-center'>
        Password must be at least 6 characters
      </p>
      <div className='flex flex-col py-4'>
        <TextField
          id='outlined-password-input'
          label='Password'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete='current-password'
        />
        {passwordError && (
          <div className='w-full text-rose-500 pb-3 flex items-center justify-center'>
            {passwordError}
          </div>
        )}
      </div>
      <div className='flex flex-col py-4'>
        <TextField
          id='outlined-password-input'
          label='Verify password'
          type='password'
          value={confirmedPassword}
          onChange={(e) => setConfirmedPassword(e.target.value)}
          autoComplete='current-verifiedpassword'
        />
        {confirmedPasswordError && (
          <div className='w-full text-rose-500 pb-3 flex items-center justify-center'>
            {confirmedPasswordError}
          </div>
        )}
      </div>
    </div>
  );
};

export default SetPassword;
