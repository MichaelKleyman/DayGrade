import React from 'react';
import TextField from '@mui/material/TextField';

const SignupInfo = ({
  formTitles,
  page,
  firstNameError,
  lastNameError,
  userNameError,
  emailError,
  ageError,
  setFirst,
  setLast,
  setUsername,
  setEmail,
  setAge,
  firstName,
  lastName,
  userName,
  email,
  age,
}) => {
  return (
    <div>
      <h2 id='signup-intro' className='text-3xl font-bold text-center py-4'>
        Lets get to know you!
      </h2>
      <div className='flex flex-col py-4'>
        <TextField
          id='outlined-password-input'
          label='First Name'
          type='First Name'
          autoComplete='current-firstname'
          value={firstName}
          onChange={(e) => setFirst(e.target.value)}
        />
        {firstNameError && (
          <div className='w-full text-rose-500 flex items-center justify-center'>
            {firstNameError}
          </div>
        )}
      </div>
      <div className='flex flex-col py-4'>
        <TextField
          id='outlined-password-input'
          label='Last Name'
          type='Last Name'
          autoComplete='current-lastname'
          value={lastName}
          onChange={(e) => setLast(e.target.value)}
        />
        {lastNameError && (
          <div className='w-full text-rose-500 flex items-center justify-center'>
            {lastNameError}
          </div>
        )}
      </div>
      <div className='flex flex-col py-4'>
        <TextField
          id='outlined-password-input'
          label='Username'
          type='Username'
          autoComplete='current-username'
          value={userName}
          onChange={(e) => setUsername(e.target.value)}
        />
        {userNameError && (
          <div className='w-full text-rose-500 flex items-center justify-center'>
            {userNameError}
          </div>
        )}
      </div>
      <div className='flex flex-col py-4'>
        <TextField
          id='outlined-password-input'
          label='Email'
          type='Email'
          autoComplete='current-email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {emailError && (
          <div className='w-full text-rose-500 flex items-center justify-center'>
            {emailError}
          </div>
        )}
      </div>
      <div className='flex flex-col py-4'>
        <TextField
          id='outlined-password-input'
          label='Age'
          type='age'
          autoComplete='current-age'
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        {ageError && (
          <div className='w-full text-rose-500 flex items-center justify-center'>
            {ageError}
          </div>
        )}
      </div>
    </div>
  );
};

export default SignupInfo;

/* <h2 className='text-3xl font-bold text-center py-4'>
              {formTitles[page]}
            </h2>
            <div className='flex flex-col py-4'>
              <TextField
                id='outlined-password-input'
                label='First Name'
                type='First Name'
                autoComplete='current-firstname'
                onChange={(e) => setFirst(e.target.value)}
              />
              {firstNameError && (
                <div className='w-full text-rose-500 flex items-center justify-center'>
                  {firstNameError}
                </div>
              )}
            </div>
            <div className='flex flex-col py-4'>
              <TextField
                id='outlined-password-input'
                label='Last Name'
                type='Last Name'
                autoComplete='current-lastname'
                onChange={(e) => setLast(e.target.value)}
              />
              {lastNameError && (
                <div className='w-full text-rose-500 flex items-center justify-center'>
                  {lastNameError}
                </div>
              )}
            </div>
            <div className='flex flex-col py-4'>
              <TextField
                id='outlined-password-input'
                label='Username'
                type='Username'
                autoComplete='current-username'
                onChange={(e) => setUsername(e.target.value)}
              />
              {userNameError && (
                <div className='w-full text-rose-500 flex items-center justify-center'>
                  {userNameError}
                </div>
              )}
            </div>
            <div className='flex flex-col py-4'>
              <TextField
                id='outlined-password-input'
                label='Email'
                type='Email'
                autoComplete='current-email'
                onChange={(e) => setEmail(e.target.value)}
              />
              {emailError && (
                <div className='w-full text-rose-500 flex items-center justify-center'>
                  {emailError}
                </div>
              )}
            </div>
            <div className='flex flex-col py-4'>
              <TextField
                id='outlined-password-input'
                label='Age'
                type='age'
                autoComplete='current-age'
                onChange={(e) => setAge(e.target.value)}
              />
              {ageError && (
                <div className='w-full text-rose-500 flex items-center justify-center'>
                  {ageError}
                </div>
              )}
            </div> */
