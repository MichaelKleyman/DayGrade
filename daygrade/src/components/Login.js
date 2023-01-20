import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Backgroundpic from '../images/Authpic.png';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const [error, setError] = useState(null);
  const [userNameError, setUsernameError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (!username || !password) {
    //   setError('Please enter username and password');
    //   return;
    // }
    if (!username) {
      setUsernameError('Please enter a valid username');
      return;
    }
    if (!password) {
      setPasswordError('Please enter a valid password');
      return;
    }
    if (password.length < 6) {
      setPasswordError('Minimum 6 character password required');
      return;
    }
  };

  return (
    <div className='grid grid-cols-1 h-screen w-full bg-black/80'>
      <img
        className='absolute w-full h-full object-cover mix-blend-overlay'
        src={Backgroundpic}
        alt='background'
      />
      <div className='flex flex-col justify-center z-[2]'>
        <form className='max-w-[400px] w-full mx-auto bg-white rounded-xl shadow-xl p-5'>
          <h2 className='text-3xl font-bold text-center py-4'>User Login</h2>

          <div className='flex flex-col py-4'>
            <TextField
              id='outlined-password-input'
              label='Username'
              type='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete='current-username'
            />
            {userNameError && (
              <div className='w-full text-rose-500 pb-3 flex items-center justify-center'>
                {userNameError}
              </div>
            )}
          </div>

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
          <div className='flex justify-center py-7'>
            <Button
              onClick={handleSubmit}
              variant='contained'
              className='py-3 w-full'
            >
              Log In
            </Button>
          </div>
          {/* {error && (
            <div className='w-full text-rose-500 pb-3 flex items-center justify-center'>
              {error}*
            </div>
          )} */}
        </form>
        <div className='flex justify-center p-4 text-sm text-gray-300'>
          <p>
            Not a member yet?{' '}
            <Link to='/welcome' className='text-blue-400 hover:underline'>
              Sign up now!
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
