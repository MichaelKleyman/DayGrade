import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Backgroundpic from '../images/Authpic.png';
import TextField from '@mui/material/TextField';

const Signup = () => {
  return (
    <div className='grid grid-cols-1 h-screen w-full bg-black/80'>
      <img
        className='absolute w-full h-full object-cover mix-blend-overlay'
        src={Backgroundpic}
        alt='background'
      />
      <div className='flex flex-col justify-center z-[2]'>
        <form className='max-w-[400px] w-full mx-auto bg-white rounded-xl shadow-xl p-5'>
          <h2 className='text-3xl font-bold text-center py-4'>
            Lets get to know you!
          </h2>
          <div className='flex flex-col py-4'>
            <TextField
              id='outlined-password-input'
              label='First Name'
              type='First Name'
              autoComplete='current-firstname'
            />
          </div>
          <div className='flex flex-col py-4'>
            <TextField
              id='outlined-password-input'
              label='Last Name'
              type='Last Name'
              autoComplete='current-lastname'
            />
          </div>
          <div className='flex flex-col py-4'>
            <TextField
              id='outlined-password-input'
              label='Username'
              type='Username'
              autoComplete='current-username'
            />
          </div>
          <div className='flex flex-col py-4'>
            <TextField
              id='outlined-password-input'
              label='Email'
              type='Email'
              autoComplete='current-email'
            />
          </div>
          <div className='flex flex-col py-4'>
            <TextField
              id='outlined-password-input'
              label='Age'
              type='age'
              autoComplete='current-age'
            />
          </div>
          <div className='flex justify-center w-full py-7'>
            <Link to='/welcome' className='w-full mr-3'>
              <Button
                style={{
                  backgroundColor: 'white',
                  color: 'blue',
                  border: 'solid',
                  borderColor: 'blue',
                }}
                variant='contained'
                className='py-3 w-full'
              >
                Back
              </Button>
            </Link>
            <Link className='w-full'>
              <Button variant='contained' className='py-3 w-full'>
                Next
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
